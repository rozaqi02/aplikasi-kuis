import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;