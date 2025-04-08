const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

// Initialize Prisma client
const prisma = new PrismaClient();

// Authentication middleware
exports.authenticate = (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required. No token provided.',
      });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');

    // Find the user - use then/catch instead of async/await
    prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found',
        });
      }

      // Add user to request object
      req.user = user;
      next();
    })
    .catch(error => {
      console.error('Auth middleware error:', error);
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed. Database error.',
      });
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      status: 'error',
      message: 'Authentication failed. Invalid token.',
    });
  }
}; 