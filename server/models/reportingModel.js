const mongoose = require("mongoose");
const reportingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueType: String,
    adminAction: String,
  },
  { timestamps: true }
);

const ReportingModel = mongoose.model("Reporting", reportingSchema);
module.exports = ReportingModel;
