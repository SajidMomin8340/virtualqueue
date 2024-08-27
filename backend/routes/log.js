import express from 'express';
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing passwords
import User from '../models/Users.js'; // Correct import for default export
import session from 'express-session'; // Import express-session

const router = express.Router();

// User Registration
router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phone });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error); // Log detailed error
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Store user ID in session
        req.session.userId = user._id;
        res.json({ message: 'Success' });
    } catch (error) {
        console.error('Login error:', error); // Log detailed error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get User Details
router.get('/user', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const user = await User.findById(req.session.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error); // Log detailed error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// User Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err); // Log detailed error
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

export default router;
