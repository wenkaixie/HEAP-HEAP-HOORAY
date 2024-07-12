const { db, admin } = require("../firebase/firebase.js");

const getBasicTheoryTestQuestion = async (req, res) => {
    const {sn}= req.body;
    if (!sn) {
        return res.status(400).json({ code: 400, message: 'Serial number is required.' });
    }
    
    try {
        const basicTheoryTestQuerySnapshot = await db.collection('basicTheoryTest').where('sn', '==', sn).get();
  
        if (basicTheoryTestQuerySnapshot.empty) {
            return res.status(404).json({ code: 404, message: 'No document found.' });
        }
  
        const basicTheoryTestDoc = basicTheoryTestQuerySnapshot.docs[0];
        const data = basicTheoryTestDoc.data();
  
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
    getBasicTheoryTestQuestion
};
