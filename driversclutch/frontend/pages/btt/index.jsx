"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';

import { collection, getDocs } from "firebase/firestore";
import { FirestoreDB } from "@/app/firebase/firebase_config";
import axios from 'axios';

const Dashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const bttCollectionRef = collection(FirestoreDB, "BTT");
                const bttQuerySnapshot = await getDocs(bttCollectionRef);

                let allQuestions = [];

                for (const doc of bttQuerySnapshot.docs) {
                    const docId = doc.id;
                    const questionsCollectionRef = collection(FirestoreDB, `BTT/${docId}/question`);
                    const questionsQuerySnapshot = await getDocs(questionsCollectionRef);
                    const questionsList = questionsQuerySnapshot.docs.map(questionDoc => ({
                        id: questionDoc.id,
                        ...questionDoc.data()
                    }));
                    allQuestions = [...allQuestions, ...questionsList];
                }

                console.log("Fetched questions:", allQuestions); // Log all fetched questions
                setQuestions(allQuestions);
            } catch (error) {
                console.error("Error fetching questions: ", error); // Log any errors
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        console.log('Questions state updated:', questions);
    }, [questions]);

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
        if (questions.length === 0) {
            return <div>Loading...</div>;
        }

        const question = questions[currentQuestionIndex];
        console.log('Rendering question:', question);

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
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <h3>{question.question}</h3>
                        <p>Your answer: {userAnswers[index]}</p>
                        <p>Correct answer: {question[question.correctAnswer]}</p>
                        <p style={{ color: userAnswers[index] === question[question.correctAnswer] ? 'green' : 'red' }}>
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
                {questions.length > 0 && renderQuestion()}
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
