import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [token, setToken] = useState(null);
    const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);
    const [queueLength, setQueueLength] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const joinQueue = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5050/queue/join', {}, { withCredentials: true });
            setToken(response.data.token);
            setEstimatedWaitTime(response.data.estimatedWaitTime);
            setQueueLength(response.data.queueLength);
            setError(null);
        } catch (err) {
            console.error('Error joining queue:', err);
            setError('Failed to join queue. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchQueueStatus = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5050/queue/status', { withCredentials: true });
            setQueueLength(response.data.queueLength);
            setError(null);
        } catch (err) {
            console.error('Error fetching queue status:', err);
            setError('Failed to fetch queue status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Welcome to Your Dashboard</h1>
            <button onClick={joinQueue} disabled={loading}>Join Queue</button>
            <button onClick={fetchQueueStatus} disabled={loading}>Refresh Queue Status</button>
            {loading && <p>Loading...</p>}
            {queueLength !== null && <p>Current Queue Length: {queueLength}</p>}
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

export default Dashboard;
