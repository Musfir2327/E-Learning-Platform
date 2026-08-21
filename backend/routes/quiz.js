import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

const staticQuizzes = [
  {
    type: 'multiple-choice',
    question: 'Which Express.js function is used to handle cross-origin permission errors?',
    choices: ['app.use(cors())', 'app.use(express.json())', 'mongoose.connect()', 'app.listen()'],
    answer: 'app.use(cors())',
    explanation: 'The cors() middleware attaches the Access-Control-Allow-Origin headers to HTTP responses, preventing Browser security policy blocks.'
  },
  {
    type: 'code-analysis',
    question: 'Identify the bug in this Express route handler:\n\napp.post("/register", async (req, res) => {\n  const user = await User.create(req.body);\n  res.json(user);\n});',
    choices: [
      'Missing try-catch block for error handling',
      'The route method should be GET instead of POST',
      'User.create is not an asynchronous function',
      'res.json is invalid syntax'
    ],
    answer: 'Missing try-catch block for error handling',
    explanation: 'Without a try-catch block, if User.create fails (e.g., due to duplicate email validation), the server will crash or return an unhandled exception, causing a 500 error.'
  },
  {
    type: 'flow-ordering',
    question: 'Rearrange these operations to represent the request-response lifecycle of an authenticated request:',
    choices: [
      '1. Browser sends Bearer JWT -> 2. Express Middleware verifies token -> 3. Route fetches MongoDB -> 4. Send Response',
      '1. Express Middleware verifies token -> 2. Route fetches MongoDB -> 3. Browser sends Bearer JWT -> 4. Send Response',
      '1. Route fetches MongoDB -> 2. Express Middleware verifies token -> 3. Browser sends Bearer JWT -> 4. Send Response',
      '1. Browser sends Bearer JWT -> 2. Route fetches MongoDB -> 3. Express Middleware verifies token -> 4. Send Response'
    ],
    answer: '1. Browser sends Bearer JWT -> 2. Express Middleware verifies token -> 3. Route fetches MongoDB -> 4. Send Response',
    explanation: 'The client browser attaches the token in the auth header, Express intercepts it at the authentication middleware, then the route handler queries MongoDB, and finally Express returns the response.'
  }
];

// @desc    Generate a dynamic quiz using Gemini or static fallback
// @route   GET /api/quiz/generate
// @access  Private
router.get('/generate', protect, async (req, res) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
    return res.json(staticQuizzes);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are the AI Debugging Mentor. Generate exactly 3 beginner-friendly full-stack debugging quiz questions.
The topics should cover common full-stack development errors (CORS, Express 500, Database timeouts, JWT auth, input validation).
Include one multiple-choice question, one code-analysis question (with a code snippet), and one flow-ordering question.
Format your output EXACTLY as a JSON array of objects:
[
  {
    "type": "multiple-choice / code-analysis / flow-ordering",
    "question": "The question title or description (and code snippet if code-analysis)",
    "choices": ["Choice A", "Choice B", "Choice C", "Choice D"],
    "answer": "The exact string representing the correct choice (must be identical to one of the options in the choices array)",
    "explanation": "Brief description of why it is correct"
  }
]
Return only this raw JSON array. Do not wrap it in markdown comments or include explanations outside the array structure.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.substring(7);
    else if (cleaned.startsWith('```')) cleaned = cleaned.substring(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.substring(0, cleaned.length - 3);

    const parsedQuiz = JSON.parse(cleaned.trim());
    res.json(parsedQuiz);
  } catch (error) {
    console.error('Quiz generation failed:', error);
    res.json(staticQuizzes); // Fail-safe fallback
  }
});

// @desc    Submit quiz results and award XP
// @route   POST /api/quiz/submit
// @access  Private
router.post('/submit', protect, async (req, res) => {
  const { score, totalQuestions } = req.body;

  if (score === undefined || !totalQuestions) {
    return res.status(400).json({ message: 'Score and totalQuestions are required' });
  }

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Award 30 XP per correct answer
      const xpAwarded = score * 30;
      user.xp += xpAwarded;

      // Adjust scores based on performance
      const performanceRatio = score / totalQuestions;
      if (performanceRatio >= 0.7) {
        user.debuggingScore = Math.min(100, user.debuggingScore + 10);
        user.architectureScore = Math.min(100, user.architectureScore + 5);

        // Unlock quiz master badge
        if (!user.achievements.includes('Quiz Master')) {
          user.achievements.push('Quiz Master');
        }
      }

      // Check level up
      const newLevel = Math.floor(user.xp / 200) + 1;
      if (newLevel > user.level) {
        user.level = newLevel;
        const milestoneBadge = `Level ${newLevel} Solver`;
        if (!user.achievements.includes(milestoneBadge)) {
          user.achievements.push(milestoneBadge);
        }
      }

      await user.save();

      res.json({
        message: `Quiz submitted successfully. Awarded ${xpAwarded} XP!`,
        xp: user.xp,
        level: user.level,
        achievements: user.achievements,
        debuggingScore: user.debuggingScore,
        architectureScore: user.architectureScore
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
