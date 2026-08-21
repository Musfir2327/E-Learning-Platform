import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Course from '../models/Course.js';

const router = express.Router();

// System prompt template
const buildSystemInstruction = (courses) => {
  const coursesText = courses.map(c => `- ${c.title} (${c.category}, Level: ${c.level}, Instructor: ${c.instructor})`).join('\n');
  return `You are the LearnHub AI Assistant, an extremely friendly, helpful, and premium coding tutor. 
Your goal is to guide students on their learning journey, answer coding questions, explain programming concepts clearly (e.g. React state/props, JavaScript scope, closures, git version control, etc.), and provide support for courses.

Here is the current list of courses available on the LearnHub platform:
${coursesText}

Keep your responses concise, use markdown formatting, code snippets (with syntax highlighting), and emojis to keep the conversation engaging.
If a user asks about a course not listed above, let them know what courses we do have, and how they can enroll. Always encourage them to complete their lessons and take the quizzes to earn certificates!`;
};

// @desc    Interact with Gemini AI Chatbot
// @route   POST /api/chat
// @access  Public (or Private)
router.post('/', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  // Gracefully handle missing API key so the app remains fully usable
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
    return res.json({
      text: "👋 Welcome to LearnHub AI Assistant! \n\n⚠️ **Configuration Required**: To enable real-time AI responses, please obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/) and paste it in `backend/.env` as `GEMINI_API_KEY=your_api_key`.\n\nCurrently, I am in configuration mode. Let me know if you need help setting it up!",
      error: "API key missing"
    });
  }

  try {
    // Retrieve courses to feed into system instructions for dynamic knowledge
    const courses = await Course.find({}).select('title category level instructor');
    const systemPrompt = buildSystemInstruction(courses);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt
    });

    // Format chat history for Gemini SDK
    // Expects: { role: 'user'|'model', parts: [{ text: string }] }
    const geminiHistory = (history || [])
      .filter(msg => msg.role === 'user' || msg.role === 'model')
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

    // Limit history length to save token costs and prevent context overflow
    const trimmedHistory = geminiHistory.slice(-20);

    const chat = model.startChat({
      history: trimmedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      text: "Sorry, I ran into an error processing your query. Please make sure your API key is valid and try again.", 
      error: error.message 
    });
  }
});

export default router;
