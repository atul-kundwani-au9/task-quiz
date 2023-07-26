
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answers: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: { type: [questionSchema], required: true, validate: [hasAtLeastOneQuestion, 'Quiz must contain at least one question.'] },
});

function hasAtLeastOneQuestion(questions) {
  return questions && questions.length >= 1;
}

module.exports = mongoose.model('Quiz', quizSchema);
