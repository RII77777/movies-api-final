const { body, param, validationResult } = require('express-validator');

exports.validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

exports.validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

exports.validateMovie = [
  body('title').notEmpty().trim(),
  body('director').notEmpty().trim(),
  body('year').isInt({ min: 1888, max: new Date().getFullYear() + 5 }),
  body('genre').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('image').isURL()
];

exports.validateReview = [
  body('movieId').isMongoId(),
  body('text').isLength({ min: 10, max: 1000 }).trim(),
  body('rating').isInt({ min: 1, max: 5 })
];

exports.validateObjectId = [
  param('id').isMongoId()
];

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};