import React from 'react';

const QuestionCard = ({ question, answers, onAnswer }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg mx-auto slide-up">
      <h2 className="text-xl font-semibold text-teal-400 mb-4 text-center">{question.question}</h2>
      <div className="grid grid-cols-1 gap-3">
        {question.all_answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="bg-gray-700 text-white p-3 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 text-center"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;