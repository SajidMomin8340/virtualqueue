import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/Users.js'; // Ensure this path is correct
import { PORT, mongodbURL } from './config.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Update this to your React frontend origin
    credentials: true
}));

app.use(cookieParser());

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('App connected to Database'))
    .catch(err => console.error('Database connection error:', err));

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).send('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).send('Error creating user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // Sign the token with a temporary secret (not secure for production)
        const token = jwt.sign({ id: user._id }, 'temporary_secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.send('Success');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/user', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Not authenticated');

    jwt.verify(token, 'temporary_secret', async (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');

        try {
            const user = await User.findById(decoded.id);
            if (!user) return res.status(404).send('User not found');
            res.send({ user });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Server error');
        }
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('authToken'); // Adjust cookie name as necessary
    res.status(200).send('Logged out');
  });

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
