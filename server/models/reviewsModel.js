const mongoose = require("mongoose");

const reveiwsSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brokerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: String,
  },
  { timestamps: true }
);

const reveiwsModel = mongoose.model("Reviews", reveiwsSchema);
module.exports = reveiwsModel;
