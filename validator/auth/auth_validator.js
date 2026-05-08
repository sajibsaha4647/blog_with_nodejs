const bcrypt = require('bcrypt');
const { body } = require('express-validator')
const User = require('../../models/UserModel');
const signupValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 2 and 30 characters')
    .trim().custom( async (value)=>{
      const user = await User.findOne({ username: value });
      console.log('checking user here', user);
      if(user){
        throw new Error('Username already exists');
      } else
        if(value.toLowerCase() === 'admin'){
            throw new Error('Username cannot be admin');
        }else if(value.toLowerCase() === 'root'){
            throw new Error('Username cannot be root');
        }else if(value.toLowerCase() === 'superuser'){
            throw new Error('Username cannot be superuser');
        }else if(value.toLowerCase() === 'test'){
            throw new Error('Username cannot be test');
        }else if(value.toLowerCase() === 'user'){
            throw new Error('Username cannot be user');
        }else if(value.toLowerCase() === 'guest'){
            throw new Error('Username cannot be guest');
        }else if(value.toLowerCase() === 'info'){
            throw new Error('Username cannot be info');
        } else if(value.toLowerCase() === 'null'){
            throw new Error('Username cannot be null');
        }else if(value.toLowerCase() === 'undefined'){
            throw new Error('Username cannot be undefined');
        }else if(value.toLowerCase() === 'default'){
            throw new Error('Username cannot be default');
        }else if(value.toLowerCase() === 'administrator'){
            throw new Error('Username cannot be administrator');
        }
        return true;
      }),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
    .trim().custom( async (value)=>{
      const user = await User.findOne({ email: value });
      console.log('checking user here', user);
      if(user){
        throw new Error('Email already exists');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
    body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
];

const signinValidation = [
 

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
    .trim().custom( async (value)=>{
      const user = await User.findOne({ email: value });
      console.log('checking user here', user);
      if(!user){
        throw new Error('Email did not match');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long').custom( async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if(user){
        const matchPass = await bcrypt.compare(value, user.password);   
        if(!matchPass){
          throw new Error('Password did not match');
        } 
      }
      return true;
    })
   
];

module.exports = {
  signupValidation,
  signinValidation
}