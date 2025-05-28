import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { QuizContext } from '../context/QuizContext';

const Result = () => {
  const { user, logout } = useContext(AuthContext);
  const { answers, questions, resetQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const correctAnswers = answers.filter((a) => a.correct).length;
  const wrongAnswers = answers.length - correctAnswers;

  const handlePlayAgain = () => {
    resetQuiz();
    navigate('/quiz');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark p-4">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-secondary mb-6">Quiz Results</h1>
        <p className="text-lg mb-4">Hello, {user?.username}!</p>
        <p className="text-lg mb-2">Total Questions: {questions.length}</p>
        <p className="text-lg mb-2">Answered: {answers.length}</p>
        <p className="text-lg mb-2 text-green-400">Correct: {correctAnswers}</p>
        <p className="text-lg mb-6 text-red-400">Wrong: {wrongAnswers}</p>
        <button
          onClick={handlePlayAgain}
          className="w-full bg-secondary text-dark font-bold py-3 rounded hover:bg-accent transition duration-300 mb-4"
        >
          Play Again
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-gray-600 text-white font-bold py-3 rounded hover:bg-gray-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Result;