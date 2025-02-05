const express = require("express");
const router = express.Router();
const {
  registerUser,
  googleAuth,
  googleAuthCallback,
} = require("../controllers/userController");

router.post("/register");
router.get("//auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

module.exports = router;
