require("dotenv").config(); // configureing .env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uri = process.env.DB_URI;
const PORT = process.env.PORT || 5000;
const userRoute = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);

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
