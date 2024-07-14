// "use client";
// import React, { useState, useEffect } from 'react';
// import Navbar from '@/app/components/navbar/navbar';
// import './page.css';
// import '@/app/components/background/background.css';
// import axios from 'axios';

// const Dashboard = () => {
//     const numOfQuestionsInDB = 30; // Hardcoded number of questions in DB
//     const numOfQnsToDisplay = 10; // Number of questions to display in the quiz

//     // State variables
//     const [randomSN, setRandomSN] = useState([]);
//     const [questionNum, setQuestionNum] = useState(0);
//     const [questionData, setQuestionData] = useState(null);
//     const [userAnswer, setUserAnswer] = useState(null);
//     const [wrongAnsQn, setWrongAnsQn] = useState([]);
//     const [isLastQuestion, setIsLastQuestion] = useState(false);
//     const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

//     // Generate random serial numbers for questions
//     useEffect(() => {
//         const generateRandomSN = (count, min, max) => {
//             let arr = Array.from({ length: max - min + 1 }, (_, i) => i + min);
//             for (let i = arr.length - 1; i > 0; i--) {
//                 const j = Math.floor(Math.random() * (i + 1));
//                 [arr[i], arr[j]] = [arr[j], arr[i]];
//             }
//             return arr.slice(0, count);
//         };

//         const randomNumbers = generateRandomSN(numOfQnsToDisplay, 1, numOfQuestionsInDB);
//         setRandomSN(randomNumbers);
//     }, []);

//     // Fetch question data
//     useEffect(() => {
//         if (randomSN.length > 0 && questionNum < randomSN.length) {
//             const fetchQnData = async () => {
//                 try {
//                     const serialNum = randomSN[questionNum];
//                     const response = await axios.get(`http://localhost:8001/students/theoryTest/basicTheoryTest/?sn=${serialNum}`);
//                     setQuestionData(response.data);
//                 } catch (error) {
//                     console.error('Error fetching question data:', error);
//                 }
//             };
//             fetchQnData();
//         }
//     }, [questionNum, randomSN]);

//     // Evaluate the answer
//     const evaluateAns = () => {
//         if (userAnswer !== questionData.correctAnswer) {
//             setWrongAnsQn(prev => [...prev, { ...questionData, userAnswer }]);
//         } else {
//             setWrongAnsQn(prev => prev.filter(q => q.sn !== questionData.sn));
//         }
//     };

//     // Handle Next button click
//     const handleNext = () => {
//         if (userAnswer !== null) {
//             evaluateAns();
//             setQuestionNum(prev => prev + 1);
//             setUserAnswer(null);
//             if (questionNum + 1 === numOfQnsToDisplay - 1) {
//                 setIsLastQuestion(true);
//             }
//         }
//     };

//     // Handle Back button click
//     const handleBack = () => {
//         if (questionNum > 0) {
//             setQuestionNum(prev => prev - 1);
//             setIsLastQuestion(false);
//         }
//     };

//     // Handle Submit button click
//     const handleSubmit = () => {
//         evaluateAns();
//         setIsQuizSubmitted(true);
//     };

//     if (isQuizSubmitted) {
//         const score = numOfQnsToDisplay - wrongAnsQn.length;
//         return (
//             <div className='dashboard'>
//                 <h2>Quiz Submitted!</h2>
//                 <p>Your score: {score} / {numOfQnsToDisplay}</p>
//                 <h3>Incorrect Questions:</h3>
//                 <ul>
//                     {wrongAnsQn.map((q, index) => (
//                         <li key={index}>
//                             <p>Q{q.sn}: {q.question}</p>
//                             <p>Your answer: {q.userAnswer}</p>
//                             <p>Correct answer: {q.correctAnswer}</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     }

//     return (
//         <div className='dashboard'>
//             <div className='title'>
//                 <h2>Basic Theory Test</h2>
//             </div>
//             <div className='dashboard-container'>
//                 {questionData && (
//                     <>
//                         <div className='qn'>
//                             Q{questionNum + 1}: {questionData.question}
//                         </div>
//                         {questionData.image && (
//                             <div className='image'>
//                                 <img src={questionData.image} alt="Question related" />
//                             </div>
//                         )}
//                         <div className='options'>
//                             <input 
//                                 type="radio" 
//                                 name="option" 
//                                 id="opt1" 
//                                 value={questionData.option1} 
//                                 checked={userAnswer === questionData.option1} 
//                                 onChange={(e) => setUserAnswer(e.target.value)} 
//                             />
//                             <label htmlFor="opt1">Option 1: {questionData.option1}</label> <br />
//                             <input 
//                                 type="radio" 
//                                 name="option" 
//                                 id="opt2" 
//                                 value={questionData.option2} 
//                                 checked={userAnswer === questionData.option2} 
//                                 onChange={(e) => setUserAnswer(e.target.value)} 
//                             />
//                             <label htmlFor="opt2">Option 2: {questionData.option2}</label> <br />
//                             <input 
//                                 type="radio" 
//                                 name="option" 
//                                 id="opt3" 
//                                 value={questionData.option3} 
//                                 checked={userAnswer === questionData.option3} 
//                                 onChange={(e) => setUserAnswer(e.target.value)} 
//                             />
//                             <label htmlFor="opt3">Option 3: {questionData.option3}</label> <br />
//                         </div>
//                         <div className='button'>
//                             {questionNum > 0 && (
//                                 <button className='btn' onClick={handleBack}>Back</button>
//                             )}
//                             <span>{questionNum + 1} of {numOfQnsToDisplay}</span>
//                             {isLastQuestion ? (
//                                 <button className='nxt-submit' onClick={handleSubmit}>Submit</button>
//                             ) : (
//                                 <button className='nxt-submit' onClick={handleNext} disabled={userAnswer === null}>Next</button>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// const BttPractice = () => {
//     return (
//         <main>
//             <div>
//                 <Navbar />
//             </div>
//             <Dashboard />
//         </main>
//     );
// };

// export default BttPractice;

"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/background/background.css';
import axios from 'axios';

const Dashboard = () => {
    const numOfQuestionsInDB = 30; // Hardcoded number of questions in DB
    const numOfQnsToDisplay = 5; // Number of questions to display in the quiz

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
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, count);
    };

    useEffect(() => {
        const randomNumbers = generateRandomSN(numOfQnsToDisplay, 1, numOfQuestionsInDB);
        setRandomSN(randomNumbers);
        setQuestionNum(0);
        setQuestionData(null);
        setUserAnswers({});
        setWrongAnsQn([]);
        setIsLastQuestion(false);
        setIsQuizSubmitted(false);
        setRetake(false);
    }, [retake]);

    // Fetch question data
    useEffect(() => {
        if (randomSN.length > 0 && questionNum < randomSN.length) {
            const fetchQnData = async () => {
                try {
                    const serialNum = randomSN[questionNum];
                    const response = await axios.get(`http://localhost:8001/students/theoryTest/basicTheoryTest/?sn=${serialNum}`);
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
                <h2>Quiz Submitted!</h2>
                <p>Your score: {score} / {numOfQnsToDisplay}</p>
                <h3>Incorrect Questions:</h3>
                <ul>
                    {wrongAnsQn.map((q, index) => (
                        <li key={index}>
                            <p>Question: {q.question}</p>
                            {q.image && (
                            <div className='image'>
                                <img src={q.image} alt="Question related" />
                            </div>
                        )}
                            <p>Your answer: {q.userAnswer}</p>
                            <p>Correct answer: {q[q.correctAnswer]}</p>
                        </li>
                    ))}
                </ul>
                <button className='btn' onClick={handleRetake}>Retake Test</button>
            </div>
        );
    }

    return (
        <div className='dashboard'>
            <div className='title'>
                <h2>Basic Theory Test</h2>
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
                            {questionNum > 0 && (
                                <button className='btn' onClick={handleBack}>Back</button>
                            )}
                            <span className='qn-indicator'>{questionNum + 1} of {numOfQnsToDisplay}</span>
                            {isLastQuestion ? (
                                <button className='nxt-submit' onClick={handleSubmit}>Submit</button>
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
