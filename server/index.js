require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uri = process.env.DB_URI;
const PORT = process.env.PORT || 5000;
const passport = require("passport");
const session = require("express-session");
const userRoute = require("./routes/userRoute");
const propertyRoute = require("./routes/propertyRoute");
const reportingRoute = require("./routes/reportingRoute");
const reviewsRoute = require("./routes/reviewsRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Make sure to set this in your environment variables
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true if using HTTPS
    },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", userRoute);
app.use("/api/property", propertyRoute);
app.use("/api/reports", reportingRoute);
app.use("/api/reviews", reviewsRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// MongoDB Connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database Failed", err.message));
