const router = require("express").Router();
const { deshboardGetRoute } = require("../controllers/deshboardController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, deshboardGetRoute);

module.exports = router;