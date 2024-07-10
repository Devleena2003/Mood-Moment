const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

//middleware

const requireSignIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .send({ success: false, message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Invalid token" });
    }
    req.user = decoded; // Attach decoded user information to request object
    next();
  });
};
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password is required",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    return res.status(200).send({
      success: true,
      message: "registration successfull",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "error in register api",
      e,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "provide email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "invalid password",
      });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      e,
    });
  }
};
const updateUserStylePreferencesController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the req.user from JWT
    const { preferredStyles } = req.body;

    // Validate the input
    if (!Array.isArray(preferredStyles)) {
      return res.status(400).send({
        success: false,
        message: "Invalid preferences format.",
      });
    }

    // Update user preferences
    const user = await userModel.findByIdAndUpdate(
      userId,
      { preferredStyles },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User style preferences updated successfully",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error updating user style preferences",
      e,
    });
  }
};

const updateUserColorPreferencesController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the req.user from JWT
    const { preferredColors } = req.body;

    // Validate the input
    if (!Array.isArray(preferredColors)) {
      return res.status(400).send({
        success: false,
        message: "Invalid preferences format. ",
      });
    }

    // Update user preferences
    const user = await userModel.findByIdAndUpdate(
      userId,
      { preferredColors },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User color preferences updated successfully",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error updating user color preferences",
      e,
    });
  }
};

module.exports = {
  requireSignIn,
  loginController,
  registerController,
  updateUserStylePreferencesController,
  updateUserColorPreferencesController,
};
