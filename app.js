
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const quizAttemptRoutes = require('./routes/quizAttempts');
const userStatsRoutes = require('./routes/userStats');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://atul12:excellent@cluster0.wvhqd3g.mongodb.net/'; 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}.`);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', quizRoutes);
app.use('/api', quizAttemptRoutes);
app.use('/api', userStatsRoutes);

module.exports = app;
