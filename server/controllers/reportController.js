const reportingModel = require("../models/reportingModel");
const User = require("../models/userModel");

// Create a new report
const createReport = async (req, res) => {
  try {
    const { userId, issueType, adminAction } = req.body;

    // check the existing user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newReport = new reportingModel({
      userId,
      issueType,
      adminAction,
    });

    await newReport.save();
    res.status(201).json({ message: "Report created successfully", newReport });
  } catch (error) {
    res.status(500).json({ message: "Error creating report", error });
  }
};

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await reportingModel
      .find()
      .populate("userId", "username email");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

// Get a specific report by ID
const getReportById = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await reportingModel
      .findById(reportId)
      .populate("userId", "username email");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error });
  }
};

// Update a report by ID
const updateReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const { issueType, adminAction } = req.body;

    const updatedReport = await reportingModel.findByIdAndUpdate(
      reportId,
      { issueType, adminAction },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res
      .status(200)
      .json({ message: "Report updated successfully", updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Error updating report", error });
  }
};

// Delete a report by ID
const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;

    const deletedReport = await reportingModel.findByIdAndDelete(reportId);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};

// Note: In a real-world application, you may want to add more validation and sanitization to prevent potential security vulnerabilities.
