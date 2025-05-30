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
    if (!user) {
      navigate('/');
    }
    if (quizFinished) {
      navigate('/result');
    }
  }, [user, quizFinished, navigate]);

  if (!questions.length) {
    return <div className="text-center text-gray-300 text-2xl mt-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-lg mx-auto mb-6 flex justify-between">
        <div className="text-lg text-gray-400">
          Question {currentQuestionIndex + 1} of {questions.length} | Answered: {answers.length}
        </div>
        <Timer time={timer} />
      </div>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        answers={questions[currentQuestionIndex].all_answers}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;