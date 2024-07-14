const { db, admin } = require("../firebase/firebase.js");

const getTotalBTTQuestions = async (req, res) => {
    try {
        const snapshot = await db.collection('BTT').get();
        const totalQuestions = snapshot.size;
        return res.status(200).json({ totalQuestions });
    } catch (error) {
        console.error('Error getting total questions:', error);
        return res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
};

const getBasicTheoryTestQuestion = async (req, res) => {
    const sn = parseInt(req.query.sn, 10); // Parse as integer
    if (isNaN(sn)) {
        return res.status(400).json({ code: 400, message: 'Valid serial number is required.' });
    }
    
    try {
        const basicTheoryTestQuerySnapshot = await db.collection('BTT').where('sn', '==', sn).get();
        console.log("basicTheoryTestQuerySnapshot here");

        if (basicTheoryTestQuerySnapshot.empty) {
            return res.status(404).json({ code: 404, message: 'No document found.' });
        }
  
        const basicTheoryTestDoc = basicTheoryTestQuerySnapshot.docs[0];
        const data = basicTheoryTestDoc.data();
        console.log(data);
  
        const correctAnswer = data.correctAnswer;
        const image = data.image;
        const option1 = data.option1;
        const option2 = data.option2;
        const option3 = data.option3;
        const question = data.question;
  
        return res.status(200).json({
            correctAnswer: correctAnswer,
            image: image,
            option1: option1,
            option2: option2,
            option3: option3,
            question: question
        });
    } catch (error) {
        console.error('Error fetching document:', error);
        return res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
};

const getTotalFTTQuestions = async (req, res) => {
    try {
        const snapshot = await db.collection('BTT').get();
        const totalQuestions = snapshot.size;
        return res.status(200).json({ totalQuestions });
    } catch (error) {
        console.error('Error getting total questions:', error);
        return res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
};

const getFinalTheoryTestQuestion = async (req, res) => {
    const sn = parseInt(req.query.sn, 10); // Parse as integer
    if (isNaN(sn)) {
        return res.status(400).json({ code: 400, message: 'Valid serial number is required.' });
    }
    
    try {
        const basicTheoryTestQuerySnapshot = await db.collection('FTT').where('sn', '==', sn).get();
        console.log("basicTheoryTestQuerySnapshot here");

        if (basicTheoryTestQuerySnapshot.empty) {
            return res.status(404).json({ code: 404, message: 'No document found.' });
        }
  
        const basicTheoryTestDoc = basicTheoryTestQuerySnapshot.docs[0];
        const data = basicTheoryTestDoc.data();
        console.log(data);
  
        const correctAnswer = data.correctAnswer;
        const image = data.image;
        const option1 = data.option1;
        const option2 = data.option2;
        const option3 = data.option3;
        const question = data.question;
  
        return res.status(200).json({
            correctAnswer: correctAnswer,
            image: image,
            option1: option1,
            option2: option2,
            option3: option3,
            question: question
        });
    } catch (error) {
        console.error('Error fetching document:', error);
        return res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
};

module.exports = {
    getTotalBTTQuestions,
    getBasicTheoryTestQuestion,
    getTotalFTTQuestions,
    getFinalTheoryTestQuestion,
};
