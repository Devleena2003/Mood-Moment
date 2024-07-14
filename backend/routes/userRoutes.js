const express = require("express");
const {
  registerController,
  loginController,
  requireSignIn,
  updateUserStylePreferencesController,
  updateUserColorPreferencesController,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.put(
  "/style/preferences",
  requireSignIn,
  updateUserStylePreferencesController
);
router.put(
  "/color/preferences",
  requireSignIn,
  updateUserColorPreferencesController
);

module.exports = router;
