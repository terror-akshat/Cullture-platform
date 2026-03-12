import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../config';

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    fetchQuizQuestions();
    fetchLeaderboard();
  }, [navigate]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const processQuestions = (data) => {
    return data.map(q => {
      const optionsWithIndex = q.options.map((option, idx) => ({
        text: option,
        originalIndex: idx
      }));
      
      const shuffledOptions = shuffleArray(optionsWithIndex);
      const newCorrectAnswer = shuffledOptions.findIndex(
        opt => opt.originalIndex === q.correctAnswer
      );

      return {
        ...q,
        options: shuffledOptions.map(opt => opt.text),
        correctAnswer: newCorrectAnswer
      };
    });
  };

  const fetchQuizQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(api.getRandomQuestions(10), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const processedQuestions = processQuestions(response.data);
      setQuestions(processedQuestions);
      setLoading(false);
      setAnswers(new Array(processedQuestions.length).fill(-1));
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(api.getLeaderboard(5));
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleAnswerClick = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      submitScore();
    }
  };

  const submitScore = async () => {
    try {
      const percentage = (score / questions.length) * 100;
      const token = localStorage.getItem('token');
      await axios.post(
        api.submitQuizScore(),
        {
          score: score,
          totalQuestions: questions.length
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setShowScore(true);
      fetchLeaderboard();
    } catch (error) {
      console.error('Error submitting score:', error);
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]);
    fetchQuizQuestions();
  };

  if (loading) {
    return (
      <div className="container py-8 text-center text-slate-300">
        Loading quiz...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="container animate-fade-up">
        <h1 className="text-4xl font-bold mb-8 text-amber-100">
          🧠 Cultural Quiz
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quiz Section */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {showScore ? (
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4 text-amber-100">
                    Quiz Complete! 🎉
                  </h2>
                  <div className="text-5xl font-bold text-emerald-300 mb-4">
                    {score} / {questions.length}
                  </div>
                  <p className="text-2xl mb-6 text-slate-200">
                    Score: {((score / questions.length) * 100).toFixed(1)}%
                  </p>
                  <div className="mb-6">
                    {((score / questions.length) * 100) >= 80 && (
                      <p className="text-lg text-emerald-300">
                        🏆 Excellent! You're a culture expert!
                      </p>
                    )}
                    {((score / questions.length) * 100) >= 60 && ((score / questions.length) * 100) < 80 && (
                      <p className="text-lg text-amber-200">
                        👍 Good job! Keep learning!
                      </p>
                    )}
                    {((score / questions.length) * 100) < 60 && (
                      <p className="text-lg text-rose-300">
                        📚 Try again and learn more!
                      </p>
                    )}
                  </div>
                  <button onClick={restartQuiz} className="btn-primary">
                    Take Quiz Again
                  </button>
                </div>
              ) : questions.length > 0 ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="font-semibold text-lg text-slate-200">
                          Question {currentQuestion + 1} / {questions.length}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="badge-pill">
                          Score: {score}
                        </span>
                        <span className="text-sm text-slate-300">
                          {answers.filter(a => a !== -1).length} answered
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-8 text-amber-100">
                    {questions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3 mb-8">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = answers[currentQuestion] === index;
                      const isCorrect = index === questions[currentQuestion].correctAnswer;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerClick(index)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition transform hover:scale-105 ${
                            isSelected
                              ? isCorrect
                                ? 'border-emerald-400 bg-emerald-900/40 shadow-lg'
                                : 'border-rose-400 bg-rose-900/30 shadow-lg'
                              : 'border-slate-600 bg-slate-900/80 hover:border-amber-400 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-amber-100">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="text-slate-100">{option}</span>
                            </div>
                            {isSelected && (
                              <span className="text-xl">
                                {isCorrect ? '✓' : '✗'}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    {currentQuestion > 0 && (
                      <button
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        className="flex-1 px-6 py-2 bg-slate-700 text-slate-50 rounded-lg hover:bg-slate-600 transition"
                      >
                        ← Previous
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      disabled={answers[currentQuestion] === -1}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentQuestion === questions.length - 1 ? 'Finish Quiz 🏁' : 'Next Question →'}
                    </button>
                  </div>

                  {/* Question Navigator */}
                  <div className="mt-8 pt-6 border-t">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Question Navigator</p>
                    <div className="grid grid-cols-5 gap-2">
                      {questions.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`aspect-square rounded-lg font-bold transition transform hover:scale-110 ${
                            index === currentQuestion
                              ? 'bg-blue-600 text-white shadow-lg'
                              : answers[index] !== -1
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-300">No questions available</p>
              )}
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="card p-6">
            <h3 className="text-2xl font-bold mb-4 text-amber-100">
              🏆 Top Scores
            </h3>
            {leaderboard.length > 0 ? (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-slate-900/70 rounded border border-slate-700"
                  >
                    <div>
                      <p className="font-semibold text-amber-200">
                        #{index + 1}
                      </p>
                      <p className="text-sm text-slate-300">{entry.userId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-300">
                        {entry.score}
                      </p>
                      <p className="text-xs text-slate-400">
                        {entry.percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-300">
                No scores yet. Be the first!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
