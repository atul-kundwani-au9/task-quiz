
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const QuizAttempt = require('../models/quizAttempt');

// View user's quiz attempts stats
router.get('/users/:userId/stats', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const totalAttempts = await QuizAttempt.countDocuments({ user: userId });
    const totalScore = await QuizAttempt.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, totalScore: { $sum: '$score' } } }
    ]);
    const averageScore = totalScore.length > 0 ? totalScore[0].totalScore / totalAttempts : 0;
    res.json({ totalAttempts, averageScore });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user stats.' });
  }
});

module.exports = router;
