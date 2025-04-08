const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

// Initialize Prisma client directly in this file
const prisma = new PrismaClient();

// Register a new user
exports.register = async (req, res) => {
  try {
    console.log('Processing registration for:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.error('Missing email or password in request');
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required',
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`User already exists: ${email}`);
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1d' }
    );

    console.log(`Registration successful for user: ${email}`);
    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      details: error.message,
    });
  }
};

// Login user with enhanced error handling
exports.login = async (req, res) => {
  try {
    console.log('Processing login for:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.error('Missing email or password in request');
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required',
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${email}`);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1d' }
    );

    // Log success and send formatted response
    console.log(`Login successful for user: ${email}`);
    
    // Return the response in the expected format
    return res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email
        },
        token
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      details: error.message,
    });
  }
};

// Validate user token
exports.validateToken = (req, res) => {
  try {
    // This route is protected by the authenticate middleware
    // If the request reaches here, the token is valid and the user exists
    
    // Return the user data from the authenticated request
    return res.status(200).json({
      status: 'success',
      data: {
        user: req.user
      },
    });
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      details: error.message,
    });
  }
}; 