import React, { createContext, useState, useEffect } from 'react';
import { fetchQuestions } from '../utils/api';
import he from 'he';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(300);
  const [quizFinished, setQuizFinished] = useState(false);

  const saveState = (state) => {
    localStorage.setItem('quizState', JSON.stringify(state));
  };

  const loadState = () => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const { savedQuestions, savedAnswers, savedIndex, savedTimer, savedTimestamp } = JSON.parse(savedState);
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - savedTimestamp;
      const remainingTime = savedTimer - elapsedTime;
      return remainingTime > 0 ? { questions: savedQuestions, answers: savedAnswers, index: savedIndex, timer: remainingTime } : null;
    }
    return null;
  };

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      setQuestions(savedState.questions);
      setAnswers(savedState.answers);
      setCurrentQuestionIndex(savedState.index);
      setTimer(savedState.timer);
    } else {
      fetchQuestions().then((data) => {
        const formattedQuestions = data.map((q) => ({
          ...q,
          question: he.decode(q.question),
          correct_answer: he.decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((a) => he.decode(a)),
          all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        }));
        setQuestions(formattedQuestions);
      });
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setQuizFinished(true);
      localStorage.removeItem('quizState');
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!quizFinished && questions.length > 0) {
      saveState({
        savedQuestions: questions,
        savedAnswers: answers,
        savedIndex: currentQuestionIndex,
        savedTimer: timer,
        savedTimestamp: Math.floor(Date.now() / 1000),
      });
    }
  }, [questions, answers, currentQuestionIndex, timer, quizFinished]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { question: questions[currentQuestionIndex].question, answer, correct: answer === questions[currentQuestionIndex].correct_answer }];
    setAnswers(newAnswers);
    if (currentQuestionIndex + 1 < questions.length) setCurrentQuestionIndex(currentQuestionIndex + 1);
    else {
      setQuizFinished(true);
      localStorage.removeItem('quizState');
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimer(300);
    setQuizFinished(false);
    localStorage.removeItem('quizState');
    fetchQuestions().then((data) => {
      const formattedQuestions = data.map((q) => ({
        ...q,
        question: he.decode(q.question),
        correct_answer: he.decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => he.decode(a)),
        all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      }));
      setQuestions(formattedQuestions);
    });
  };

  return (
    <QuizContext.Provider value={{ questions, currentQuestionIndex, answers, timer, quizFinished, handleAnswer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};