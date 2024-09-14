import express from 'express';
import Queue from '../models/Queue.js'; // Import your Queue model

const router = express.Router();

// Generate a unique token in the format TKXX
function generateToken(queueLength) {
    const tokenNumber = queueLength + 1; // Simple increment logic
    return `TK${tokenNumber.toString().padStart(2, '0')}`; // Format as TK01, TK02, etc.
}

// Join Queue
router.post('/join', async (req, res) => {
    try {
        const userId = req.session.userId; // Get the logged-in user's ID from the session
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Find or create a queue entry for the user
        const allQueues = await Queue.find(); // Get all queue entries
        const queueLength = allQueues.length;

        const userQueue = new Queue({
            userId,
            token: generateToken(queueLength),
            joinTime: Date.now(),
        });

        await userQueue.save();

        // Calculate estimated wait time
        const waitTime = calculateEstimatedWaitTime(queueLength);

        res.status(200).json({
            token: userQueue.token,
            estimatedWaitTime: waitTime,
            queueLength: queueLength + 1 // Including the current user
        });
    } catch (error) {
        console.error('Error joining queue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Function to calculate estimated wait time
function calculateEstimatedWaitTime(queueLength) {
    const averageServiceTime = 30; // Example: each person takes 30 seconds
    const estimatedWaitTime = queueLength * averageServiceTime; // Total wait time for all in queue
    return estimatedWaitTime;
}

// Endpoint to get the current queue status
router.get('/status', async (req, res) => {
    try {
        const allQueues = await Queue.find();
        const queueLength = allQueues.length;

        res.status(200).json({ queueLength });
    } catch (error) {
        console.error('Error fetching queue status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
