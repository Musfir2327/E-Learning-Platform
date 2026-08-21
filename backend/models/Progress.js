import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completedLessons: { type: [String], default: [] }, // List of topic keys completed
  solvedErrors: { type: [String], default: [] }, // List of simulated error types solved
  roadmapStep: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
