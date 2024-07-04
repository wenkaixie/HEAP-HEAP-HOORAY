const {db, admin} = require("../firebase/firebase.js");

const updateFirstName = async (req, res) => {
    const {studentID, firstname} = req.body;

    if(!studentID || !firstname) {
        return res.status(400).json({code: 400, message: "Student Doc ID and updated firstname required"})
    }

    try {
        await db.collection("students").doc(studentID).update({
            firstName: firstname
        })
        return res.status(200).json({code: 200, message: "First name is updated"});
    }
    catch (error) {
        return res.status(500).json({code: 500, message: `Error updating firstname: ${error}`});
    }
}

const updateLastName = async (req, res) => {
    const {studentID, lastname} = req.body;

    if(!studentID || !lastname) {
        return res.status(400).json({code: 400, message: "Student Doc ID and updated lastname required"})
    }

    try {
        await db.collection("students").doc(studentID).update({
            lastName: lastname
        })
        return res.status(200).json({code: 200, message: "Last name is updated"});
    }
    catch (error) {
        return res.status(500).json({code: 500, message: `Error updating lastname: ${error}`});
    }
}

const updateBirthdate = async (req, res) => {
    const {studentID, birthdate} = req.body;

    if(!studentID || !birthdate) {
        return req.status(400).json({code: 400, message: "Student Doc ID and updated lastname required"})
    }

    try {
        await db.collection("students").doc(studentID).update({
            birthdate: birthdate
        })
    } 
    catch (error) {
        return res.status(500).json({code:500, message: `Error updating birthdate: ${error}`});
    }
}

module.exports = {
    updateBirthdate,
    updateFirstName,
    updateLastName
}