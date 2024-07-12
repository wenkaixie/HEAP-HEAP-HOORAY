const {db} = require("../firebase/firebase.js")

const getBalance = async(req, res) => {
    const studentID = req.query.id;
    try {
        const studentDoc = await db.collection("students").doc(studentID).get();
        const balance = studentDoc.data().balance;

        return res.status(200).json({code: 200, balance: balance});
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
        return res.status(500).json({ code: 500, message: `Error getting balance: ${error}` });
    }
}

module.exports = {
    getBalance,
    topupBalance
}