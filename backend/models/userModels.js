const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
      min: 6,
      max: 10,
    },
    role: {
      type: String,
      default: "user",
    },
    preferredColors: {
      type: [String], // Array of strings for multiple colors
      default: [],
    },
    preferredStyles: {
      type: [String], // Array of strings for multiple styles
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
