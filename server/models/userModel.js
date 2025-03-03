const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: String,
    phoneNumber: { type: String, unique: true, required: true },
    username: { type: String, required: false },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ["Tenant", "Broker"] },
    profilePicture: { type: String, default: "default-profile.png" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
