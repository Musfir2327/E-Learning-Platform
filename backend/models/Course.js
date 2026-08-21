import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, enum: ['video', 'reading', 'quiz'], default: 'video' },
  youtubeId: { type: String, default: '' },
  content: { type: String, default: '' }
});

const quizQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  choices: { type: [String], required: true },
  answer: { type: String, required: true }
});

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  instructor: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  students: { type: Number, default: 0 },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  lessons: { type: [lessonSchema], default: [] },
  quiz: { type: [quizQuestionSchema], default: [] }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
