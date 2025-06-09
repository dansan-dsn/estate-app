import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URI!)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

export default mongoose.connection;
