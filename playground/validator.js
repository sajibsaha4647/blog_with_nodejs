const router = require('express').Router()
const { check, validationResult } = require('express-validator')

router.get('/',(req,res,next)=>{
    res.render('playground/signup',{ title:"validator playground" });
})

router.post('/signup',[
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .isLength({ min: 2, max: 30 })
        .withMessage('Username must be between 2 and 30 characters').trim(),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail()
        .trim(),

        check('password').custom((value,{req})=>{
            if(value !== req.body.confirmPassword){
                throw new Error('Password confirmation does not match password');
            }else if(value.length < 5){
                throw new Error('Password must be at least  5 characters long');
            }
            return true;})
],(req,res,next)=>{
    const errors = validationResult(req);

   const formatter = (err) => err.msg;

const formattedErrors = errors.formatWith(formatter).mapped();
console.log(formattedErrors);

    // console.log(errors.array());
    // if(!errors.isEmpty()){
    //     return res.render('playground/signup',{
    //         title:"validator playground",
    //         errors: errors.array().map(formatter)
    //     });
    // }
    res.render('playground/signup',{ title:"validator playground" });
})

module.exports = router