import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const hasSavedQuiz = !!localStorage.getItem('quizState');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/quiz');
    }
  };

  const handleStartNewQuiz = () => {
    localStorage.removeItem('quizState');
    login(username);
    navigate('/quiz');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto slide-up">
        <h1 className="text-4xl font-semibold text-teal-400 mb-6 text-center fade-in">
          {hasSavedQuiz ? 'Lanjutkan Kuis Sebelumnya?' : 'Selamat Datang di Kuis'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-center" htmlFor="username">Nama Pengguna</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan nama pengguna"
              required
            />
          </div>
          {hasSavedQuiz ? (
            <div className="flex space-x-4">
              <button type="submit" className="flex-1 bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600">Lanjutkan</button>
              <button type="button" onClick={handleStartNewQuiz} className="flex-1 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700">Mulai Baru</button>
            </div>
          ) : (
            <button type="submit" className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600">Mulai Kuis</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;