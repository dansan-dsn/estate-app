const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    brokerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: String,
    rent: Number,
    price: Number,
    propertyType: String,
    size: String,
    rooms: Number,
    petPolicy: String,
    images: [String],
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number],
    },
  },
  { timestamps: true }
);

const propertyModel = mongoose.model("Property", propertySchema);
module.exports = propertyModel;
