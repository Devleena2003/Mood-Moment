const express = require("express");
const {
  registerController,
  loginController,
  requireSignIn,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
