import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import "./config/db";
import userRouter from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
