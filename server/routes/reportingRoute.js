const express = require("express");
const router = express.Router();
const {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

router.post("/create", createReport);

router.get("/fetch", getAllReports);

router.get("/fetch/:id", getReportById);

router.put("/update/:id", updateReport);

router.delete("/delete/:id", deleteReport);

module.exports = router;
