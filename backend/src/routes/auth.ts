import express, { Request, Response } from 'express';
import { register, login, validateToken } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Routes with simplified handlers to avoid TypeScript issues
router.post('/register', function(req, res) {
  register(req, res).catch(function(err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

router.post('/login', function(req, res) {
  login(req, res).catch(function(err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Validate route uses middleware
router.get('/validate', authenticate, (req: Request, res: Response) => {
  validateToken(req, res);
});

export default router; 