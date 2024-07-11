const {db} = require("../firebase/firebase.js");

const getAllStudentInfo = async (req, res) => {
    const instructorID = req.query.id;
    try {
        const instructorDoc = await db.collection("instructors").doc(instructorID).get();
        if (!instructorDoc.exists) {
            return res.status(404).json({ code: 404, message: "Instructor not found" });
        }

        const studentList = instructorDoc.data().studentList;
        const studentInfoPromises = studentList.map(async (studentID) => {
            const studentDoc = await db.collection("students").doc(studentID).get();
            if (studentDoc.exists) {
                const firstName = studentDoc.data().firstName;
                const lastName = studentDoc.data().lastName;
                const studentName = firstName + " " + lastName;
                const upcomingLessons = studentDoc.data().upcomingLessons;
                const completedLessons = studentDoc.data().completedLessons;
                const upcomingLessonsISO = upcomingLessons.map(ts => ts.toDate().toISOString());
                const completedLessonsISO = completedLessons.map(ts => ts.toDate().toISOString());
                return {
                    studentID: studentDoc.id,
                    studentName: studentName,
                    upcomingLessons: upcomingLessonsISO,
                    completedLessons: completedLessonsISO
                }
                // return studentDoc.data();
            } else {
                return { studentID, message: "Student not found" };
            }
        });

        const studentInfos = await Promise.all(studentInfoPromises);
        return res.status(200).json(studentInfos);
    }
    catch (error) {
        return res.status(500).json({code: 500, message: `Error getting upcoming lessons: ${error} `})
    }
}

module.exports = {
    getAllStudentInfo
}