const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({
      message: "Review created successfully",
      review
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("movieId");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("movieId");
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    res.json({
      message: "Review updated successfully",
      review
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};