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
    return <div className="text-center text-white text-2xl mt-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark p-4">
      <div className="flex justify-between w-full max-w-lg mb-6">
        <div className="text-lg text-gray-300">
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