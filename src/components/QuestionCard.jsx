import React from 'react';

const QuestionCard = ({ question, answers, onAnswer }) => {
  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-bold text-secondary mb-4">{question.question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {question.all_answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="bg-gray-800 text-white p-3 rounded hover:bg-accent transition duration-300"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;