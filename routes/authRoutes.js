const router = require("express").Router();
const { signinValidation,signupValidation } = require("../validator/auth/auth_validator");
const {
  signInGetController,
  signInPostController,
  signUpGetController,
  signUpPostController,
  logoutController
} = require("../controllers/authController");

const { isUnauthenticated} = require('../middleware/authMiddleware');




router.get("/signin",isUnauthenticated, signInGetController);
router.post("/signin", isUnauthenticated, signinValidation, signInPostController);
router.get("/signup", isUnauthenticated, signUpGetController);
router.post("/signup", isUnauthenticated, signupValidation, signUpPostController);
router.get("/logout", logoutController);

module.exports = router;

