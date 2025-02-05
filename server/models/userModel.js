const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  googleId: String,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
