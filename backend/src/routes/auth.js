const express = require('express');
const { register, login, validateToken } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Register route
router.post('/register', (req, res) => {
  register(req, res).catch((err) => {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Login route with better error handling
router.post('/login', (req, res) => {
  console.log('Login attempt with data:', req.body);
  
  login(req, res).catch((err) => {
    console.error('Login error details:', err);
    res.status(500).json({ 
      message: 'Internal server error',
      error: err.message || 'Unknown error' 
    });
  });
});

// Validate route
router.get('/validate', authenticate, (req, res) => {
  validateToken(req, res);
});

module.exports = router; 