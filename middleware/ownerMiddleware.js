const Review = require('../models/Review');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const isOwner = review.userId.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.review = review;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};