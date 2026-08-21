import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  choices: { type: [String], required: true },
  answer: { type: String, required: true },
  explanation: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['multiple-choice', 'flow-ordering', 'code-analysis'], 
    default: 'multiple-choice' 
  }
}, {
  timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
