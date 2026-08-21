import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Admin'], default: 'Student' },
  
  // Gamification & Progress metrics
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  achievements: { type: [String], default: [] },
  solvedErrorsCount: { type: Number, default: 0 },
  completedLessons: { type: [String], default: [] },
  completedCourses: { type: [String], default: [] },
  passedQuizzes: { type: [String], default: [] },
  completedTopics: { type: [String], default: [] },
  
  // Skill Proficiencies (out of 100)
  debuggingScore: { type: Number, default: 20 },
  architectureScore: { type: Number, default: 20 },
  apiScore: { type: Number, default: 20 },
  backendScore: { type: Number, default: 20 },
  frontendScore: { type: Number, default: 20 },
  databaseScore: { type: Number, default: 20 }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
