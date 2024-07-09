const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (e) {
    console.log(` error in db connection ${e}`);
  }
};
module.exports = connectDB;
