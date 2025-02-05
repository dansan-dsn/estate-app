const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await userModel.findOne({ googleId: profile.id });
      if (!user) {
        user = new userModel({
          googleId: profile.id,
          email: profile.emails[0].value,
        });
        await user.save();
      }
      done(null, user);
    }
  )
);

const createToken = (_id) => {
  const jwtkey = process.env.JWT_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

const googleAuth = async (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

const googleAuthCallback = async (req, res) => {
  const token = createToken(req.userModel._id);
  res.json({ token });
};

module.exports = { registerUser, googleAuth, googleAuthCallback };
