const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizScore = require('../models/QuizScore');
const auth = require('../middleware/auth');

// Get all quiz questions (protected)
router.get('/questions', auth, async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get random quiz questions (protected)
router.get('/random/:count', auth, async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 5;
    const questions = await Quiz.aggregate([{ $sample: { size: count } }]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit quiz score (protected)
router.post('/submit', auth, async (req, res) => {
  try {
    const { score, totalQuestions } = req.body;
    const percentage = (score / totalQuestions) * 100;

    const quizScore = new QuizScore({
      userId: req.userId || 'Anonymous',
      score,
      totalQuestions,
      percentage
    });

    const savedScore = await quizScore.save();
    res.status(201).json(savedScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get leaderboard
router.get('/leaderboard/:limit', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    const scores = await QuizScore.find()
      .sort({ score: -1, percentage: -1 })
      .limit(limit);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;