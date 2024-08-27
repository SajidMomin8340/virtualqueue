import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import log from './routes/log.js'; // Adjust according to the actual path

import { PORT, mongodbURL } from './config.js'; // Ensure mongodbURL is correctly set

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Update this to your React frontend origin
    credentials: true,
}));

app.use(cookieParser());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret', // Use environment variable for secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, // Adjust as necessary
}));

// Routes
app.use('/', log);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// Database connection
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('App connected to Database'))
    .catch(err => console.error('Database connection error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
