const router = require("express").Router();
const { signinValidation,signupValidation } = require("../validator/auth/auth_validator");
const {
  signInGetController,
  signInPostController,
  signUpGetController,
  signUpPostController,
  logoutController
} = require("../controllers/authController");






router.get("/signin", signInGetController);
router.post("/signin", signinValidation, signInPostController);
router.get("/signup", signUpGetController);
router.post("/signup",signupValidation, signUpPostController);
router.get("/logout", logoutController);

module.exports = router;
