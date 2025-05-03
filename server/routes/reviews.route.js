const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");

router.post("/create", createReview);
router.get("/fetch", getAllReviews);
router.get("/fetch/:id", getReview);
router.put("/update/:id", updateReview);
router.delete("/delete/:id", deleteReview);

module.exports = router;
