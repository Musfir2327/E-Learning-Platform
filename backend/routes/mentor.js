import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import DebugHistory from '../models/DebugHistory.js';
import Progress from '../models/Progress.js';

const router = express.Router();

// Helper to clean JSON string from Gemini markdown wrappers
const cleanGeminiJson = (text) => {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
};

// @desc    Analyze error using Gemini AI Debugging Mentor
// @route   POST /api/mentor/debug
// @access  Private
router.post('/debug', protect, async (req, res) => {
  const { rawError, codeSnippet } = req.body;

  if (!rawError) {
    return res.status(400).json({ message: 'Error log/description is required' });
  }

  // Fallback in case Gemini API key is missing
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
    return res.json({
      layerAnalyzed: 'Express Server',
      aiExplanation: 'Gemini API Key is missing. Standard diagnostic fallback initialized.',
      severity: 'Medium',
      rootCause: 'Backend environment requires GEMINI_API_KEY configuration to support live AI analyses.',
      stepByStepFix: '1. Navigate to backend/.env\n2. Insert your Google AI Studio API Key\n3. Restart server.',
      preventionTips: 'Ensure environment properties are populated during workspace deployment.',
      beginnerExplanation: 'Like trying to turn on a TV when it is not plugged in. The AI needs a key plug-in to turn on.',
      resolved: false
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are the AI Debugging Mentor specifically for beginner full-stack developers.
Analyze the following error log or stack trace:
Error log: "${rawError}"
Related Code Snippet: "${codeSnippet || 'None provided'}"

Analyze it and respond with a JSON object. You must classify which architectural layer caused it: "Browser", "React Frontend", "REST API", "Express Server", or "MongoDB".
Respond EXACTLY in this JSON format:
{
  "layer": "Browser / React Frontend / REST API / Express Server / MongoDB",
  "severity": "Low / Medium / High / Critical",
  "rootCause": "Clear explanation of the exact root cause of this error",
  "stepByStepFix": "Detailed numbered steps to fix it",
  "preventionTips": "Best practice tips to avoid making this mistake again",
  "beginnerExplanation": "A very friendly, beginner-friendly explanation of why this happened, using a real-world analogy."
}
Return only this raw JSON object. Do not wrap it in markdown comments or include explanations outside the JSON structure.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = cleanGeminiJson(text);
    const parsedData = JSON.parse(cleanedText);

    // Save to Debug History
    const history = await DebugHistory.create({
      user: req.user._id,
      rawError,
      codeSnippet: codeSnippet || '',
      layerAnalyzed: parsedData.layer,
      aiExplanation: parsedData.rootCause,
      severity: parsedData.severity,
      rootCause: parsedData.rootCause,
      stepByStepFix: parsedData.stepByStepFix,
      preventionTips: parsedData.preventionTips,
      beginnerExplanation: parsedData.beginnerExplanation
    });

    // Update User XP & Metrics
    const user = await User.findById(req.user._id);
    if (user) {
      user.xp += 50;
      user.solvedErrorsCount += 1;

      // Adjust layer scores based on analyzed layer
      const layerKey = parsedData.layer.toLowerCase();
      if (layerKey.includes('browser')) user.frontendScore = Math.min(100, user.frontendScore + 8);
      else if (layerKey.includes('react')) user.frontendScore = Math.min(100, user.frontendScore + 8);
      else if (layerKey.includes('api')) user.apiScore = Math.min(100, user.apiScore + 8);
      else if (layerKey.includes('express')) user.backendScore = Math.min(100, user.backendScore + 8);
      else if (layerKey.includes('mongo')) user.databaseScore = Math.min(100, user.databaseScore + 8);

      user.debuggingScore = Math.min(100, user.debuggingScore + 5);
      user.architectureScore = Math.min(100, user.architectureScore + 3);

      // Check level up (every 200 XP increases level)
      const newLevel = Math.floor(user.xp / 200) + 1;
      if (newLevel > user.level) {
        user.level = newLevel;
        // Auto unlock achievement
        const milestoneBadge = `Level ${newLevel} Solver`;
        if (!user.achievements.includes(milestoneBadge)) {
          user.achievements.push(milestoneBadge);
        }
      }

      // Check first solve badge
      if (user.solvedErrorsCount === 1 && !user.achievements.includes('First Fix')) {
        user.achievements.push('First Fix');
      }

      await user.save();
    }

    res.json(history);
  } catch (error) {
    console.error('Gemini Debug Analysis Error:', error);
    res.status(500).json({ message: 'AI Analysis failed', error: error.message });
  }
});

// @desc    Perform AI code review
// @route   POST /api/mentor/review
// @access  Private
router.post('/review', protect, async (req, res) => {
  const { codeSnippet } = req.body;

  if (!codeSnippet) {
    return res.status(400).json({ message: 'Code snippet is required' });
  }

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
    return res.json({
      performance: 'Add GEMINI_API_KEY for performance audits.',
      security: 'Add GEMINI_API_KEY for security audits.',
      smells: 'Add GEMINI_API_KEY for code smell identification.',
      readability: 'Add GEMINI_API_KEY for readability score.',
      architecture: 'Add GEMINI_API_KEY for architecture critique.'
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are a Senior Full Stack Software Engineer.
Analyze this code snippet pasted by a student developer:
"${codeSnippet}"

Audit the code and suggest improvements. Respond EXACTLY with a JSON object in this format:
{
  "performance": "Analysis of efficiency, speed bottlenecks, and database queries. Suggest optimisations.",
  "security": "Any vulnerabilities (CORS issues, SQL/Mongo injection risks, cleartext secrets, XSS, etc.).",
  "smells": "Coding bad practices, nested logic, naming inconsistencies, unused scopes.",
  "readability": "How legible the code is and naming / comments recommendations.",
  "architecture": "Critique structure, components separation, state management, controller bindings."
}
Return only this raw JSON object. Do not include markdown codeblocks or wrap it.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = cleanGeminiJson(text);
    const parsedData = JSON.parse(cleanedText);

    // Give some XP
    const user = await User.findById(req.user._id);
    if (user) {
      user.xp += 15;
      await user.save();
    }

    res.json(parsedData);
  } catch (error) {
    console.error('Code review error:', error);
    res.status(500).json({ message: 'Code review failed', error: error.message });
  }
});

// @desc    Get dynamic roadmap/learning path recommendations
// @route   GET /api/mentor/roadmap
// @access  Private
router.get('/roadmap', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
      return res.json({
        recommendations: [
          'Study CORS protocols to improve your API GATEWAY score.',
          'Review Mongoose Schema Validation to improve your Database score.',
          'Read Express Middleware lifecycle to raise your Backend score.'
        ]
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are the AI Debugging Mentor.
A student developer has the following proficiency scores in full stack categories (scores out of 100):
- Frontend: ${user.frontendScore}/100
- Backend: ${user.backendScore}/100
- API Integration: ${user.apiScore}/100
- Database: ${user.databaseScore}/100
- Debugging: ${user.debuggingScore}/100
- System Architecture: ${user.architectureScore}/100

Identify their weakest areas and generate exactly 3 custom, actionable roadmap recommendations.
Return EXACTLY in this JSON format:
{
  "recommendations": [
    "Weakest area task 1: specific concept study recommendation with action steps",
    "Next weakest area task 2: specific concept study recommendation with action steps",
    "Architecture/Debugging study task 3: specific exercise recommendation"
  ]
}
Return only this raw JSON object. Do not include markdown codeblocks or wrap it.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = cleanGeminiJson(text);
    const parsedData = JSON.parse(cleanedText);

    res.json(parsedData);
  } catch (error) {
    console.error('Roadmap recommendation error:', error);
    res.status(500).json({ message: 'Failed to generate roadmap', error: error.message });
  }
});

export default router;
