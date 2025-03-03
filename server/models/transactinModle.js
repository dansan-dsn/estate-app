const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: Number,
    paymentMethod: String,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("Transactions", transactionSchema);
module.exports = transactionModel;
