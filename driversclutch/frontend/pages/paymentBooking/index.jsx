"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase";

const Dashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const fetchQuestions = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'BTT'));
            const questions = [];
            querySnapshot.forEach((doc) => {
                questions.push(doc.data());
            });
            console.log('Questions:', questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    // Call the fetchQuestions function when the component mounts
    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleAnswerChange = (event) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: event.target.value
        });
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSubmit = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score += 1;
            }
        });
        setScore(score);
        setQuizSubmitted(true);
    };

    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        return (
            <div>
                <div className='question'>Q{currentQuestionIndex + 1}: {question.question}</div>
                {["option1", "option2", "option3"].map((option, i) => (
                    <p key={i}>
                        <input
                            type="radio"
                            name={`question${currentQuestionIndex}`}
                            value={question[option]}
                            checked={userAnswers[currentQuestionIndex] === question[option]}
                            onChange={handleAnswerChange}
                        />
                        <span className='option'>{question[option]}</span>
                    </p>
                ))}
            </div>
        );
    };

    const renderResults = () => {
        return (
            <div>
                <h2>Your Score: {score}/{questions.length}</h2>
                {questions.map((question, index) => (
                    <div key={index} className="question-container">
                        <h3>{question.question}</h3>
                        <p>Your answer: {userAnswers[index]}</p>
                        <p>Correct answer: {question[question.correctAnswer]}</p>
                        <p className={userAnswers[index] === question[question.correctAnswer] ? 'correct-answer' : 'wrong-answer'}>
                            {userAnswers[index] === question[question.correctAnswer] ? "Correct" : "Wrong"}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    if (quizSubmitted) {
        return renderResults();
    }

    return (
        <div className='dashboard'>
            <div className='title'>
                <h1>Basic Theory Test</h1>
            </div>
            <div className='dashboard-container'>
                {questions.length > 0 ? renderQuestion() : <p>Loading questions...</p>}
                <div className='btn'>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button className='next-btn' onClick={handleNext}>Next</button>
                    ) : (
                        <button className='next-btn' onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const BttPractice = () => {
    return (
        <main>
            <div>
                <Navbar />
            </div>
            <Dashboard />
        </main>
    );
};

export default BttPractice;