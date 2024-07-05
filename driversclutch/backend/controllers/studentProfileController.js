const {db, admin} = require("../firebase/firebase.js");

const getInfo = async (req, res) => {
    const studentID = req.query.id;

    try {
        const studentDoc = await db.collection("students").doc(studentID).get();
        if (!studentDoc) {
            return res.status(404).json({code: 404, message: "Student not found"})
        }
        const studentInfo = studentDoc.data();
        const {upcomingLessons, completedLessons, instructor, ...filteredData } = studentInfo;
        return res.status(200).json({code: 200, data: filteredData});
    }
    catch (error) {
        return res.status(500).send(`Error getting info: ${error}`);
    }
}

const updateInfo = async (req, res) => {
    const {studentID, firstname, lastname, birthdate} = req.body;

    if(!studentID || !firstname || !lastname || !birthdate) {
        return res.status(400).json({code: 400, message: "Student Doc ID and updated firstname/lastname/birthdate required"})
    }

    try {
        await db.collection("students").doc(studentID).update({
            firstName: firstname,
            lastName: lastname,
            birthdate: birthdate
        })
        return res.status(200).json({code: 200, message: "Information successfully is updated"});
    }
    catch (error) {
        return res.status(500).json({code: 500, message: `Error updating info: ${error}`});
    }
}

module.exports = {
    updateInfo,
    getInfo
}