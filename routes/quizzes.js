
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Quiz = require('../models/quiz');

// Create a quiz
router.post('/quizzes', authMiddleware, async (req, res) => {
  try {
    const quizData = req.body;
    quizData.creator = req.user._id; // Assuming you store the user ID in req.user after authentication
    const quiz = await Quiz.create(quizData);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create quiz.' });
  }
});

// Get all quizzes (including user's own)
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).populate('creator', 'username');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes.' });
  }
});

module.exports = router;
