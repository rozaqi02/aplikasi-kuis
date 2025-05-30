import React from 'react';

const Timer = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-lg font-semibold text-teal-400 bg-gray-700 p-3 rounded-lg fade-in">
      Waktu Tersisa: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;