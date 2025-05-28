import React, { createContext, useState, useEffect } from 'react';
import { fetchQuestions } from '../utils/api';
import he from 'he';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(300); // 5 menit (300 detik)
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const loadQuizState = () => {
      const savedState = localStorage.getItem('quizState');
      if (savedState) {
        const { savedQuestions, savedAnswers, savedIndex, savedTimer } = JSON.parse(savedState);
        setQuestions(savedQuestions);
        setAnswers(savedAnswers);
        setCurrentQuestionIndex(savedIndex);
        setTimer(savedTimer);
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
    };

    loadQuizState();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setQuizFinished(true);
      localStorage.removeItem('quizState');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (questions.length > 0 && !quizFinished) {
      localStorage.setItem(
        'quizState',
        JSON.stringify({
          savedQuestions: questions,
          savedAnswers: answers,
          savedIndex: currentQuestionIndex,
          savedTimer: timer,
        })
      );
    }
  }, [questions, answers, currentQuestionIndex, timer, quizFinished]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, { question: questions[currentQuestionIndex].question, answer, correct: answer === questions[currentQuestionIndex].correct_answer }]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
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
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        answers,
        timer,
        quizFinished,
        handleAnswer,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};