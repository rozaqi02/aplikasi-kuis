import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/quiz');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-secondary mb-6 text-center">Welcome to Quiz App</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter your username"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-dark font-bold py-3 rounded hover:bg-accent transition duration-300"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;