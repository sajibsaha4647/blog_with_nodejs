const bcrypt = require('bcrypt')
const User = require("./../models/UserModel");
const { validationResult } = require('express-validator')
const validationErrorFormatter = require('./../utils/validationErrorFormatter')

const signInGetController = (req, res, next) => {
  console.log('checking here', req.get('Cookie'));
  let isLogedin = req.get('Cookie')?.split('=')[1] === 'true' ? true : false;
  if(isLogedin){
    return res.render("pages/home/index", { title: "Exp Blog" });
  }
  res.render("pages/auth/signin", { title: "Account Login", errors: {},
        formData: req.body,isLogedin: isLogedin });
};

const signInPostController = async (req, res, next) => {

  let { email, password } = req.body;
  let isLogedin = req.get('Cookie')?.split('=')[1] === 'true' ? true : false;

    let errors = validationResult(req);

     if(!errors.isEmpty()){ 
      console.log('validation error', validationErrorFormatter(errors));
      return res.render('pages/auth/signin',{
        title:"Account Login",
        errors: validationErrorFormatter(errors),
        formData: req.body
      });
       return true;
    }

  console.log("checking here", req.body);

  try {

    let findUser = await User.findOne({ email });

    if (!findUser) {
      console.log("Invalid Credential");

      return res.render("pages/auth/signin", {
        title: "Account Login",
         isLogedin: isLogedin
      });
    }

    let matchPass = await bcrypt.compare(
      password,
      findUser.password
    );

    if (!matchPass) {

      console.log("Password did not match");

      return res.render("pages/auth/signin", {
        title: "Account Login",
         isLogedin: isLogedin
      });
    }

    console.log('User login successfully');
    res.setHeader('Set-Cookie', 'isLogedin=true');
    res.render("pages/home/index", {
      title: "Exp Blog",
      isLogedin: isLogedin
    });

  } catch (e) {

    console.log(`checking error here ${e}`);

    next(e);

  }

};

const signUpGetController = (req, res, next) => {
  let isLogedin = req.get('Cookie')?.split('=')[1] === 'true' ? true : false;
  res.render("pages/auth/signup", { title: "Create new account" , errors: {},formData: req.body, isLogedin: isLogedin});
};
const signUpPostController = async(req, res, next) => {
   let isLogedin = req.get('Cookie')?.split('=')[1] === 'true' ? true : false;
   let { username, email, password } = req.body;

   let errors = validationResult(req);

    if(!errors.isEmpty()){ 
      console.log('validation error', validationErrorFormatter(errors));
      return res.render('pages/auth/signup',{
        title:"Create new account",
        errors: validationErrorFormatter(errors),
        formData: req.body,
        isLogedin: isLogedin
      });
       return true;
    }

  try {
     let hashPassword = await bcrypt.hash(password,11)
       let user = new User({
          userName:username,
          email:email,
          password:hashPassword
        });

        console.log({
    username,
    email,
    password : hashPassword
  });

    let createUser = await user.save(); 

    console.log('User created successfully', createUser);

    res.render("pages/auth/signin", {
      title: "Account Login",
        isLogedin: isLogedin
    });

  } catch (e) { 

    console.log(`checking error here ${e}`);

    next(e);

  }
 
};

const logoutController = (req, res, next) => {};

module.exports = {
  signInGetController,
  signInPostController,
  signUpGetController,
  signUpPostController,
  logoutController,
};
