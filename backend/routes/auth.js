import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'learnhubsecretjwtkey123!', {
    expiresIn: '30d',
  });
};

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  xp: user.xp,
  level: user.level,
  achievements: user.achievements || [],
  solvedErrorsCount: user.solvedErrorsCount || 0,
  debuggingScore: user.debuggingScore || 20,
  architectureScore: user.architectureScore || 20,
  apiScore: user.apiScore || 20,
  backendScore: user.backendScore || 20,
  frontendScore: user.frontendScore || 20,
  databaseScore: user.databaseScore || 20,
  completedLessonIds: user.completedLessons || [],
  completedCourses: user.completedCourses ? user.completedCourses.length : 0,
  certificates: user.passedQuizzes ? user.passedQuizzes.length : 0,
  completedTopicIds: user.completedTopics || [],
  passedQuizCourseIds: user.passedQuizzes || []
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Auto-detect admin role
    const isEmailAdmin = email.toLowerCase().includes('admin');
    const role = isEmailAdmin ? 'Admin' : 'Student';

    const user = await User.create({
      name,
      email,
      password,
      role,
      xp: 0,
      level: 1,
      achievements: [],
      solvedErrorsCount: 0,
      debuggingScore: 20,
      architectureScore: 20,
      apiScore: 20,
      backendScore: 20,
      frontendScore: 20,
      databaseScore: 20
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        user: formatUserResponse(user)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        user: formatUserResponse(user)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json(formatUserResponse(user));
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
