const bcrypt = require('bcrypt')
const User = require("./../models/UserModel");
const { validationResult } = require('express-validator')
const validationErrorFormatter = require('./../utils/validationErrorFormatter')

const signInGetController = (req, res, next) => {
  // console.log('cing heheckre', req.get('Cookie'));
  console.log('checking here', req.session.user, req.session.isLogedin);
  res.render("pages/auth/signin", { title: "Account Login", errors: {},
        formData: req.body });
};

const signInPostController = async (req, res, next) => {

  let { email, password } = req.body;
 

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
        
      });
    }

    console.log('User login successfully');
    // res.setHeader('Set-Cookie', 'isLogedin=true');
    req.session.isLogedin = true;

req.session.user = {
   id: findUser._id.toString(),
   userName: findUser.userName,
   email: findUser.email,
};

req.session.save((err) => {
  if (err) {
    console.log('Error in saving session after login', err);
    return next(err);
  } 
res.redirect('/dashboard');
});

    

  } catch (e) {

    console.log(`checking error here ${e}`);

    next(e);

  }

};

const signUpGetController = (req, res, next) => {
 
  res.render("pages/auth/signup", { title: "Create new account" , errors: {},formData: req.body,});
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
       
    });

  } catch (e) { 

    console.log(`checking error here ${e}`);

    next(e);

  }
 
};

const logoutController = (req, res, next) => {

  req.session.destroy((err) => {
    if (err) {
      console.log('Error in destroying session during logout', err);
      return next(err);
    }
    res.redirect('/auth/signin');

  });

};

module.exports = {
  signInGetController,
  signInPostController,
  signUpGetController,
  signUpPostController,
  logoutController,
};
