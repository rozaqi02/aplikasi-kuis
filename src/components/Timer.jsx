import React from 'react';

const Timer = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-xl font-bold text-secondary bg-gray-800 p-3 rounded-lg">
      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;