import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  badgeName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true }, // e.g. 'Award', 'Cpu', 'Database', 'Activity', 'ShieldAlert'
  xpRequired: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
