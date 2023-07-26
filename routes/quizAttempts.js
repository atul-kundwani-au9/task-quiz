
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const QuizAttempt = require('../models/quizAttempt');
const Quiz = require('../models/quiz');

// Attempt a quiz
router.post('/quizzes/:quizId/attempt', authMiddleware, async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const user = req.user._id;

    // Fetch the quiz to ensure it exists and is published
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }

    // Record the attempt
    const attemptData = req.body.answers; // Assuming you receive the answers in the request body
    const score = calculateScore(quiz, attemptData);
    const attempt = await QuizAttempt.create({ quiz: quizId, user, score });
    res.status(201).json(attempt);
  } catch (err) {
    res.status(500).json({ error: 'Failed to attempt the quiz.' });
  }
});

// Helper function to calculate the score of the attempt
function calculateScore(quiz, attemptData) {
  let score = 0;
  for (const [index, answer] of attemptData.entries()) {
    const question = quiz.questions[index];
    if (question.correctAnswerIndex === answer) {
      score++;
    }
  }
  return score;
}

module.exports = router;
