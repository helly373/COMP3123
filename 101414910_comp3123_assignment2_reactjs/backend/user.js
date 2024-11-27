const express = require('express');
const { body, validationResult } = require('express-validator'); // Import validation functions
const cors = require('cors');
const app = express();
const router = express.Router();
const User = require('./schema/userschema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  credentials: true
}));
app.use(express.json()); // Add express.json() to parse incoming JSON requests

// JWT secret key (ideally, store it in environment variables)
const JWT_SECRET = process.env.JWT_SECRET; // Use JWT secret from .env

//POST /api/v1/user/signup 

router.post('/signup', 
    // Validation rules
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    
    async (req, res) => {
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) {
            console.error('Validation error:', errors.array());
            return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
        }

        const { username, email, password } = req.body;

        try {
            // Check if email or username already exists
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                if (existingUser.email === email) {
                    console.error('Signup error: User already exists with email', email);
                    return res.status(400).json({ message: 'User already exists with this email.' });
                }
                if (existingUser.username === username) {
                    console.error('Signup error: User already exists with username', username);
                    return res.status(400).json({ message: 'User already exists with this username.' });
                }
            }

            // Create new user
            const newUser = new User({
                username,
                email,
                password,
            });

            await newUser.save();

            // Generate JWT token
            const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ message: 'User created successfully', userID: newUser._id, token });
        } catch (error) {
            console.error('Server error during signup:', error);
            res.status(500).json({ message: 'Server error', details: error.message });
        }
    }
);

// POST /api/v1/user/login
router.post('/login', 
    // Validation rules
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    
    async (req, res) => {
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) {
            console.error('Validation error:', errors.array());
            return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                console.error('Login error: User not found with email', email);
                return res.status(401).json({ message: 'User Not Found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.error('Login error: Invalid password for email', email);
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login Successful', user: user.username, token });
        } catch (error) {
            console.error('Server error during login:', error);
            res.status(500).json({ error: 'Error logging in', details: error.message });
        }
    }
);

module.exports = router; // Export the router