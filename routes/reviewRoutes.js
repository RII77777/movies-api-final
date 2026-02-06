const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const ownerMiddleware = require('../middleware/ownerMiddleware');
const {
  validateReview,
  validateObjectId,
  handleValidation
} = require('../middleware/validationMiddleware');

router.get('/', reviewController.getReviews);
router.get('/:id', validateObjectId, handleValidation, reviewController.getReview);
router.post('/', authMiddleware, validateReview, handleValidation, reviewController.createReview);
router.put('/:id', authMiddleware, validateObjectId, validateReview, handleValidation, ownerMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, validateObjectId, handleValidation, ownerMiddleware, reviewController.deleteReview);

module.exports = router;