const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
  handleValidation
} = require('../middleware/validationMiddleware');

router.post('/register', validateRegister, handleValidation, register);
router.post('/login', validateLogin, handleValidation, login);

module.exports = router;