const {db} = require("../firebase/firebase.js")

const getBalance = async(req, res) => {
    const studentID = req.query.id;
    try {
        const studentDoc = await db.collection("students").doc(studentID).get();
        const balance = studentDoc.data().balance;

        const instructorSnapshot = await db
            .collection('instructors')
            .where('studentList', 'array-contains', studentID)
            .get();

        if (instructorSnapshot.empty) {
            return res.status(404).json({ code: 404, message: "No instructors found for the student." });
        }
        
        const instructorDoc = instructorSnapshot.docs[0];
        const lessonFee = instructorDoc.data().lessonFee;
        
        return res.status(200).json({code: 200, balance: balance, lessonFee: lessonFee});
    }
    catch (error) {
        return res.status(500).json({ code: 500, message: `Error getting balance: ${error}` });
    }
}

const topupBalance = async(req, res) => {
    const {studentID, amount} = req.body;

    if (!studentID || typeof amount !== 'number') {
        return res.status(400).json({ code: 400, message: 'Invalid input: studentID and amount are required and amount must be a number.' });
    }

    try {
        const studentDoc = await db.collection("students").doc(studentID).get();
        const currentBalance = studentDoc.data().balance;
        const newBalance = currentBalance + amount;
        
        await db.collection("students").doc(studentID).update({
            balance: newBalance
        })

        return res.status(200).json({code: 200, message: `Balance updated, new balance is ${newBalance}`});
    }
    catch (error) {
        return res.status(500).json({ code: 500, message: `Error topping-up balance: ${error}` });
    }
}

const deductBalance = async (req, res) => {
    const {studentID, amount} = req.body; //amount to be deducted in positive number, 
    try {
        const studentDoc = await db.collection("students").doc(studentID).get();
        const currentBalance = studentDoc.data().balance;
        let newBalance = currentBalance;
        if (currentBalance >  amount) {
            newBalance = currentBalance - amount;
        }
        else {
            return res.status(400).json({code:400, message:"Insufficient account balance. Please top-up balance."});
        }
        await db.collection("students").doc(studentID).update({
            balance: newBalance
        })
        return res.status(200).json({code: 200, message: `Balance updated, new balance is ${newBalance}`});   
    }
    catch (error) {
        return res.status(500).json({ code: 500, message: `Error making payment: ${error}` });
    }
}
module.exports = {
    getBalance,
    topupBalance,
    deductBalance
}