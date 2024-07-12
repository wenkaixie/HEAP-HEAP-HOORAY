// hvnt test
const {db} = require("../firebase/firebase.js");

const getUpcomingLessons = async (req, res) => {
    const instructorID = req.query.id;
    try {
        const instructorDoc = await db.collection("instructors").doc(instructorID).get();
        if (!instructorDoc.exists) {
            return res.status(404).json({ code: 404, message: "Instructor not found" });
        }

        const lessonsSnapshot = await db.collection("instructors").doc(instructorID).collection("upcomingLessons").get();
        const lessons = await Promise.all(lessonsSnapshot.docs.map(async (doc) => {
            const lessonData = doc.data();
            const timeslots = lessonData.timeslots;
            const studentDoc = await db.collection("students").doc(lessonData.student).get();
            const studentFirstName = studentDoc.exists ? studentDoc.data().firstName : null;
            const studentLastName = studentDoc.exists ? studentDoc.data().lastName : null;
            const studentName = studentFirstName + " " + studentLastName;
            
            const timeslotsISO = timeslots.map(ts => ts.toDate().toISOString());

            return {
                id: doc.id,
                timeslots: timeslotsISO,
                studentID: lessonData.student,
                studentName: studentName
            };
        }));

        return res.status(200).json({
            code: 200,
            upcomingLessons: lessons
        });
    }
    catch (error) {
        return res.status(500).json({code: 500, message: `Error getting upcoming lessons: ${error} `})
    }
}

module.exports = {
    getUpcomingLessons
}