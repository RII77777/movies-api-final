const Review = require('../models/Review');
const Movie = require('../models/Movie');

exports.createReview = async (req, res) => {
  try {
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const reviewData = {
      ...req.body,
      userId: req.user.userId
    };

    const review = new Review(reviewData);
    await review.save();

    const populatedReview = await Review.findById(review._id)
      .populate('userId', 'email')
      .populate('movieId', 'title');

    res.status(201).json({
      message: 'Review created successfully',
      review: populatedReview
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'email')
      .populate('movieId', 'title director year')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', 'email')
      .populate('movieId', 'title director year genre');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('userId', 'email')
      .populate('movieId', 'title');

    res.json({
      message: 'Review updated successfully',
      review: updatedReview
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};