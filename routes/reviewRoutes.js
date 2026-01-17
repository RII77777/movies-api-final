const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

router.post("/", async (req, res) => {
  const { movieId, author, text, rating } = req.body;
  if (!movieId || !author || !text || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const reviews = await Review.find().populate("movieId");
  res.json(reviews);
});

router.get("/movie/:movieId", async (req, res) => {
  const reviews = await Review.find({ movieId: req.params.movieId });
  res.json(reviews);
});

router.put("/:id", async (req, res) => {
  const { author, text, rating } = req.body;
  if (!author || !text || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
});

module.exports = router;