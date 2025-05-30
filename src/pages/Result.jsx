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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto text-center slide-up">
        <h1 className="text-4xl font-semibold text-teal-400 mb-6">Hasil Kuis</h1>
        <p className="text-lg mb-2">Total Soal: {questions.length}</p>
        <p className="text-lg mb-2">Dijawab: {answers.length}</p>
        <p className="text-lg mb-2 text-green-400">Benar: {correctAnswers}</p>
        <p className="text-lg mb-6 text-red-400">Salah: {wrongAnswers}</p>
        <button
          onClick={handlePlayAgain}
          className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 mb-4"
        >
          Main Lagi
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Result;