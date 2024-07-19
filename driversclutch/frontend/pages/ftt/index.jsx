
"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/background/background.css';
import axios from 'axios';
import { url } from '../../src/app/firebase/firebase_config';

const Dashboard = () => {
    // const numOfQuestionsInDB = 30; // Hardcoded number of questions in DB
    const numOfQnsToDisplay = 10; // Number of questions to display in the quiz

    const [totalQuestions, setTotalQuestions] = useState(0);
    const [numOfQuestionsInDB, setNumOfQuestionsInDB] = useState(null);

    // Fetch the total number of questions from the backend
    useEffect(() => {
        const fetchTotalQuestions = async () => {
            try {
                const response = await axios.get(`${url}/students/theoryTest/totalFTTQuestions`);
                setNumOfQuestionsInDB(response.data.totalQuestions);  // Assuming response.data has a totalQuestions field
            } catch (error) {
                console.error('Error fetching total questions:', error);
            }
        };

        fetchTotalQuestions();
    }, []);

    useEffect(() => {
        if (numOfQuestionsInDB !== null) {
            setTotalQuestions(numOfQuestionsInDB);
        }
    }, [numOfQuestionsInDB]);

    console.log(totalQuestions);

    // State variables
    const [randomSN, setRandomSN] = useState([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [questionData, setQuestionData] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [wrongAnsQn, setWrongAnsQn] = useState([]);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const [retake, setRetake] = useState(false);

    // Generate random serial numbers for questions
    const generateRandomSN = (count, min, max) => {
        let arr = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    
        // Fisher-Yates (Knuth) Shuffle
        for (let i = arr.length - 1; i > arr.length - 1 - count; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    
        // Only return the first 'count' elements
        return arr.slice(arr.length - count);
    };
    

    useEffect(() => {
        if (totalQuestions > 0) {
            const randomNumbers = generateRandomSN(numOfQnsToDisplay, 1, totalQuestions);
            setRandomSN(randomNumbers);
            setQuestionNum(0);
            setQuestionData(null);
            setUserAnswers({});
            setWrongAnsQn([]);
            setIsLastQuestion(false);
            setIsQuizSubmitted(false);
            setRetake(false);
        }
    }, [totalQuestions, retake]);
    

    // Fetch question data
    useEffect(() => {
        if (randomSN.length > 0 && questionNum < randomSN.length) {
            const fetchQnData = async () => {
                try {
                    const serialNum = randomSN[questionNum];
                    const response = await axios.get(`${url}/students/theoryTest/finalTheoryTest/?sn=${serialNum}`);
                    setQuestionData(response.data);
                } catch (error) {
                    console.error('Error fetching question data:', error);
                }
            };
            fetchQnData();
        }
    }, [questionNum, randomSN]);

    // Evaluate the answer
    const evaluateAns = () => {
        const currentQuestionData = {
            ...questionData,
            userAnswer: userAnswers[questionNum],
            sn: randomSN[questionNum] // Ensure 'sn' or some unique identifier is part of questionData
        };

        // Find the correct answer's value
        const correctAnswerValue = questionData[questionData.correctAnswer];

        // Determine if the user's answer is correct
        if (userAnswers[questionNum] !== correctAnswerValue) {
            if (!wrongAnsQn.some(q => q.sn === currentQuestionData.sn)) {
                setWrongAnsQn(prev => [...prev, currentQuestionData]);
            }
        } else {
            setWrongAnsQn(prev => prev.filter(q => q.sn !== currentQuestionData.sn));
        }
    };

    // Handle Next button click
    const handleNext = () => {
        if (userAnswers[questionNum] !== undefined) {
            evaluateAns();
            setQuestionNum(prev => prev + 1);
            if (questionNum + 1 === numOfQnsToDisplay - 1) {
                setIsLastQuestion(true);
            }
        }
    };

    // Handle Back button click
    const handleBack = () => {
        if (questionNum > 0) {
            setQuestionNum(prev => prev - 1);
            setIsLastQuestion(false);
        }
    };

    // Handle Submit button click
    const handleSubmit = () => {
        evaluateAns();
        setIsQuizSubmitted(true);
    };

    // Handle Retake button click
    const handleRetake = () => {
        setRetake(true);
    };

    if (isQuizSubmitted) {
        const score = numOfQnsToDisplay - wrongAnsQn.length;
        return (
            <div className='dashboard'>
                <div className='title'>
                    <h2>Test Summary</h2>
                </div>

                <div className='dashboard-container'>
                    <div className='score' style={{ fontWeight: 400 }}>
                        Your score: {score} / {numOfQnsToDisplay}
                    </div>

                    {wrongAnsQn.length > 0 && (
                        <div className='incorrect-header'>
                            <h3 style={{ fontWeight: 600 }}>Incorrect Questions:</h3>
                        </div>
                    )}

                    {wrongAnsQn.map((q, index) => (
                        <div className='wrong-qn' key={q.sn}>
                            <div className='qn'>
                                Question: {q.question}
                            </div>

                            {q.image && (
                                <div className='image'>
                                    <img src={q.image} alt="Question related" />
                                </div>
                            )}

                            <div className='ans'>
                                <div className='your-ans'>
                                    Your answer: {q.userAnswer}
                                </div>
                                <div className='correct'>
                                    Correct answer: {q[q.correctAnswer]}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='retake-container'>
                        <button className='retake-btn' onClick={handleRetake}>Retake test</button>
                    </div>


                </div>

            </div>
        );
    }

    return (
        <div className='dashboard'>
            <div className='title'>
                <h2>Final Theory Test</h2>
            </div>
            <div className='dashboard-container'>
                {questionData && (
                    <>
                        <div className='qn'>
                            Q{questionNum + 1}: {questionData.question}
                        </div>
                        {questionData.image && (
                            <div className='image'>
                                <img src={questionData.image} alt="Question related" />
                            </div>
                        )}
                        <div className='options'>
                            <input
                                type="radio"
                                name="option"
                                id="opt1"
                                value={questionData.option1}
                                checked={userAnswers[questionNum] === questionData.option1}
                                onChange={(e) => setUserAnswers(prev => ({ ...prev, [questionNum]: e.target.value }))}
                            />
                            <label htmlFor="opt1">Option 1: {questionData.option1}</label> <br />
                            <input
                                type="radio"
                                name="option"
                                id="opt2"
                                value={questionData.option2}
                                checked={userAnswers[questionNum] === questionData.option2}
                                onChange={(e) => setUserAnswers(prev => ({ ...prev, [questionNum]: e.target.value }))}
                            />
                            <label htmlFor="opt2">Option 2: {questionData.option2}</label> <br />
                            <input
                                type="radio"
                                name="option"
                                id="opt3"
                                value={questionData.option3}
                                checked={userAnswers[questionNum] === questionData.option3}
                                onChange={(e) => setUserAnswers(prev => ({ ...prev, [questionNum]: e.target.value }))}
                            />
                            <label htmlFor="opt3">Option 3: {questionData.option3}</label> <br />
                        </div>
                        <div className='button'>
                            <button className='btn' onClick={handleBack} disabled={questionNum === 0}>Back</button>
                            <div className='qn-indicator'>
                                {questionNum + 1} of {numOfQnsToDisplay}
                            </div>
                            {isLastQuestion ? (
                                <button className='nxt-submit' onClick={handleSubmit} disabled={userAnswers[questionNum] === undefined}>Submit</button>
                            ) : (
                                <button className='nxt-submit' onClick={handleNext} disabled={userAnswers[questionNum] === undefined}>Next</button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const FttPractice = () => {
    return (
        <main>
            <div>
                <Navbar />
            </div>
            <Dashboard />
        </main>
    );
};

export default FttPractice;

