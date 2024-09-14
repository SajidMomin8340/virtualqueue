import React, { useState } from 'react';
import axios from 'axios';

const VirtualQueue = () => {
    const [token, setToken] = useState(null);
    const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);
    const [error, setError] = useState(null);

    const joinQueue = async () => {
        try {
            const response = await axios.post('http://localhost:5050/queue/join', {}, { withCredentials: true });
            setToken(response.data.token);
            setEstimatedWaitTime(response.data.estimatedWaitTime);
        } catch (err) {
            console.error('Error joining queue:', err);
            setError('Failed to join queue. Please try again.');
        }
    };

    return (
        <div>
            <h1>Welcome to Your Virtual Queue</h1>
            <button onClick={joinQueue}>Join Queue</button>
            {token && (
                <div>
                    <h2>Your Token: {token}</h2>
                    <p>Estimated Wait Time: {estimatedWaitTime} seconds</p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default VirtualQueue;
