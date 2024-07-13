"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // useEffect(() => {
    //     const fetchQuestions = async () => {
    //         try {
    //             const bttCollectionRef = collection(FirestoreDB, "BTT");
    //             const bttQuerySnapshot = await getDocs(bttCollectionRef);

    //             let allQuestions = [];

    //             for (const doc of bttQuerySnapshot.docs) {
    //                 const docId = doc.id;
    //                 const questionsCollectionRef = collection(FirestoreDB, `BTT/${docId}/question`);
    //                 const questionsQuerySnapshot = await getDocs(questionsCollectionRef);
    //                 const questionsList = questionsQuerySnapshot.docs.map(questionDoc => ({
    //                     id: questionDoc.id,
    //                     ...questionDoc.data()
    //                 }));
    //                 allQuestions = [...allQuestions, ...questionsList];
    //             }

    //             console.log("Fetched questions:", allQuestions); // Log all fetched questions
    //             setQuestions(allQuestions);
    //         } catch (error) {
    //             console.error("Error fetching questions: ", error); // Log any errors
    //         }
    //     };

    //     fetchQuestions();
    // }, []);

    ////////////////////////////////////////////////

    // useEffect(() => {
    //     const fetchQuestions = async () => {
    //       try {
    //         const userDocID = localStorage.getItem('userDocID');
    //         if (!userDocID) {
    //           throw new Error('User document ID not found in localStorage');
    //         }
    //         console.log(`Fetching theorypractice data for userDocID: ${userDocID}`);
    //         const response = await axios.get(`http://localhost:8001/students/booking/?id=${userDocID}`);
    //         console.log('API Response:', response.data);
    // setQuestion(response.data);
    //       } catch (error) {
    //         console.error('Error fetching theorypractice data:', error);
    //         setError(error.message);
    //       }
    //     };

    //     fetchQuestions();
    //   }, []);

    // useEffect(() => {
    //     console.log('Questions state updated:', questions);
    // }, [questions]);

    // const handleAnswerChange = (event) => {
    //     setUserAnswers({
    //         ...userAnswers,
    //         [currentQuestionIndex]: event.target.value
    //     });
    // };

    // const handleNext = () => {
    //     setCurrentQuestionIndex(currentQuestionIndex + 1);
    // };

    // const handleSubmit = () => {
    //     let score = 0;
    //     questions.forEach((question, index) => {
    //         if (userAnswers[index] === question.correctAnswer) {
    //             score += 1;
    //         }
    //     });
    //     setScore(score);
    //     setQuizSubmitted(true);
    // };

    // const renderQuestion = () => {
    //     if (questions.length === 0) {
    //         return <div>Loading...</div>;
    //     }

    //     const question = questions[currentQuestionIndex];
    //     console.log('Rendering question:', question);

    //     return (
    //         <div>
    //             <div className='question'>Q{currentQuestionIndex + 1}: {question.question}</div>
    //             {["option1", "option2", "option3"].map((option, i) => (
    //                 <p key={i}>
    //                     <input
    //                         type="radio"
    //                         name={`question${currentQuestionIndex}`}
    //                         value={question[option]}
    //                         checked={userAnswers[currentQuestionIndex] === question[option]}
    //                         onChange={handleAnswerChange}
    //                     />
    //                     <span className='option'>{question[option]}</span>
    //                 </p>
    //             ))}
    //         </div>
    //     );
    // };

    // const renderResults = () => {
    //     return (
    //         <div>
    //             <h2>Your Score: {score}/{questions.length}</h2>
    //             {questions.map((question, index) => (
    //                 <div key={index} style={{ marginBottom: "20px" }}>
    //                     <h3>{question.question}</h3>
    //                     <p>Your answer: {userAnswers[index]}</p>
    //                     <p>Correct answer: {question[question.correctAnswer]}</p>
    //                     <p style={{ color: userAnswers[index] === question[question.correctAnswer] ? 'green' : 'red' }}>
    //                         {userAnswers[index] === question[question.correctAnswer] ? "Correct" : "Wrong"}
    //                     </p>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // };

    // if (quizSubmitted) {
    //     return renderResults();
    // }

    return (
        <div className='dashboard'>
            <div className='title'>
                <h2>Basic Theory Test</h2>
            </div>
            <div className='dashboard-container'>
                <div className='qn'>
                    Q1: How are you today?
                </div>
                <div className='options'>
                    <input type="radio" name="option" id="option1" /> 
                    <label for="option1">Option 1: Great!</label> <br />
                    <input type="radio" name="option" id="option2" /> 
                    <label for="option2">Option 2: Losing touch with the world</label> <br />
                    <input type="radio" name="option" id="option3" />
                    <label for="option3">Option 3: SHIBAL</label> <br />
                </div>

            <div className='button'>
                <button className='btn'>Next</button>
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
