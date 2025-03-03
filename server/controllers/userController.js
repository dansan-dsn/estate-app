const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/userModel");

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.SECRET_KEY
) {
  throw new Error("Missing required environment variables");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile: ", profile);

        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new userModel({
            googleId: profile.id,
            email: profile.emails[0].value,
          });
          await user.save();
        }
        console.log("Authenticated User: ", user);
        done(null, user);
      } catch (error) {
        console.error("Error in Google Auth callback: ", error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const createToken = (_id) => {
  try {
    const jwtkey = process.env.SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;

    if (!email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 5) {
      return res.status(400).json({ message: "Password too short" });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await user.save();

    const token = createToken(user._id);

    res.status(201).json({ _id: user._id, phoneNumber, email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleAuthRedirect = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User authentication failed" });
    }
    const token = createToken(req.user._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating token" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { username, profilePicture } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["Tenant", "Broker"].includes(role)) {
      return res.status(400).json({ message: "Invalid role type" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "User role updated successfully", role: user.role });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleAuth,
  googleAuthRedirect,
  getUserProfile,
  updateUserProfile,
  updateUserRole,
};
