const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  validateMovie,
  validateObjectId,
  handleValidation
} = require('../middleware/validationMiddleware');

router.get('/', movieController.getMovies);
router.get('/:id', validateObjectId, handleValidation, movieController.getMovie);
router.post('/', authMiddleware, roleMiddleware, validateMovie, handleValidation, movieController.createMovie);
router.put('/:id', authMiddleware, roleMiddleware, validateObjectId, validateMovie, handleValidation, movieController.updateMovie);
router.delete('/:id', authMiddleware, roleMiddleware, validateObjectId, handleValidation, movieController.deleteMovie);

module.exports = router;