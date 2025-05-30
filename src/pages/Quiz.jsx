import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { QuizContext } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

const Quiz = () => {
  const { user } = useContext(AuthContext);
  const { questions, currentQuestionIndex, answers, timer, quizFinished, handleAnswer } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || quizFinished) navigate(quizFinished ? '/result' : '/');
  }, [user, quizFinished, navigate]);

  if (!questions.length) return <div className="text-center text-gray-300 text-2xl mt-10 fade-in">Memuat...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-2xl mx-auto mb-6 flex justify-between items-center">
        <div className="text-lg text-gray-400">Soal {currentQuestionIndex + 1} dari {questions.length} | Dijawab: {answers.length}</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{user?.username}</span>
          <Timer time={timer} />
        </div>
      </div>
      <QuestionCard question={questions[currentQuestionIndex]} answers={questions[currentQuestionIndex].all_answers} onAnswer={handleAnswer} />
    </div>
  );
};

export default Quiz;