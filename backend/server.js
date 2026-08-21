import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import chatRoutes from './routes/chat.js';
import mentorRoutes from './routes/mentor.js';
import simulatorRoutes from './routes/simulator.js';
import quizRoutes from './routes/quiz.js';
import Course from './models/Course.js';
import User from './models/User.js';
import Feedback from './models/Feedback.js';
import { protect } from './middleware/auth.js';
import { seedCourses } from './seedData.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Database Connection
connectDB();

// Seeding Function
const seedDatabase = async () => {
  try {
    // 1. Seed Courses
    const courseCount = await Course.countDocuments();
    const firstCourse = await Course.findOne({});
    const needsReseed = firstCourse && firstCourse.lessons.length > 0 && !firstCourse.lessons[0].youtubeId;

    if (courseCount === 0 || needsReseed) {
      console.log('Seeding/Updating courses into MongoDB...');
      await Course.deleteMany({});
      await Course.insertMany(seedCourses);
      console.log('Courses seeded successfully.');
    }

    // 2. Seed Default Accounts
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding default users into MongoDB...');
      
      // Default Student
      await User.create({
        name: 'Jane Doe',
        email: 'student@learnhub.edu',
        password: 'studentpassword123',
        role: 'Student',
        xp: 150,
        level: 1,
        achievements: ['First Fix'],
        solvedErrorsCount: 1,
        debuggingScore: 35,
        architectureScore: 40,
        apiScore: 30,
        backendScore: 35,
        frontendScore: 45,
        databaseScore: 25
      });

      // Default Admin
      await User.create({
        name: 'Mohammed Musfir',
        email: 'admin@learnhub.edu',
        password: 'adminpassword123',
        role: 'Admin',
        xp: 1200,
        level: 6,
        achievements: ['First Fix', 'Quiz Master', 'Level 5 Solver', 'Code Auditor'],
        solvedErrorsCount: 12,
        debuggingScore: 85,
        architectureScore: 75,
        apiScore: 80,
        backendScore: 90,
        frontendScore: 85,
        databaseScore: 80
      });

      console.log('Default testing profiles seeded successfully.');
    }
  } catch (error) {
    console.error('Database seeding error:', error);
  }
};

// Seeding trigger
setTimeout(seedDatabase, 2000);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/simulator', simulatorRoutes);
app.use('/api/quiz', quizRoutes);

// Feedback endpoint
app.post('/api/feedback', protect, async (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ message: 'Topic and message are required' });
  }

  try {
    const feedback = await Feedback.create({
      user: req.user._id,
      topic,
      message
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin endpoint to view all feedbacks
app.get('/api/admin/feedbacks', protect, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const feedbacks = await Feedback.find({}).populate('user', 'name email');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Base route
app.get('/', (req, res) => {
  res.send('LearnHub AI Debugging Mentor API is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5001;

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running in mode on port ${PORT}`);
});
