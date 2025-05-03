const reviewsModel = require("../models/reviews.model");
const UserModel = require("../models/user.model");

const createReview = async (req, res) => {
  try {
    const { reviewerId, brokerId, rating, reviewText } = req.body;

    const reviewer = await UserModel.findById(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ message: "Reviewer not found" });
    }

    const broker = await UserModel.findById(brokerId);
    if (!broker) {
      return res.status(404).json({ message: "Broker not found" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const newReview = new reviewsModel({
      reviewerId,
      brokerId,
      rating,
      reviewText,
    });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel
      .find()
      .populate("reviewerId", "username email")
      .populate("brokerId", "username email");
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReview = async (req, res) => {
  try {
    const review = await reviewsModel
      .findById(req.params.id)
      .populate("reviewerId", "username email")
      .populate("brokerId", "username email");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const updatedReview = await reviewsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await reviewsModel.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
