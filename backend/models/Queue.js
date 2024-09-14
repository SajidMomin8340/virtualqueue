import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    joinTime: { type: Date, required: true },
});

const Queue = mongoose.model('Queue', queueSchema);
export default Queue;