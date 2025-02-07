const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleAuth,
  googleAuthRedirect,
  getUserProfile,
  updateUserProfile,
  updateUserRole,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth/google", googleAuth);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthRedirect
);
router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile_update", authenticateToken, updateUserProfile);
router.put("/update_role", authenticateToken, updateUserRole);

module.exports = router;
