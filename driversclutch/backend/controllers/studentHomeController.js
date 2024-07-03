const {db, admin} = require("../firebase/firebase.js");

const getLessonProgress = async (req,res) => {
    try {   
        const studentID = req.query.studentID;
        const studentDocRef = db.collection("students").doc(studentID);
        const doc = await studentDocRef.get();
        const currentTimestamp = new Date();

        if (!doc.exists) {
            return res.status(400).send("Student not found")
        }

        const upcomingLessons = doc.data().upcomingLessons || [];
        const completedLessons = doc.data().completedLessons || [];

        const updatedUpcomingLessons = [];
        const updatedCompletedLessons = [...completedLessons];  
        
        upcomingLessons.forEach((lesson) => {
            const lessonDate = new Date(lesson.seconds * 1000); //firestore timestamp to date object
            if (lessonDate < currentTimestamp) {
                updatedCompletedLessons.push(lesson);
            } else {
                updatedUpcomingLessons.push(lesson);
            }
        });

        await studentDocRef.update({
            upcomingLessons: updatedUpcomingLessons,
            completedLessons: updatedCompletedLessons
        });

        const lessonCount = updatedCompletedLessons.length;

        const updatedUpcomingLessonsISO = updatedUpcomingLessons.map(timestamp => timestamp.toDate().toISOString());

        return res.status(200).json({code: 200, upcomingLessons: updatedUpcomingLessonsISO, lessonCount: lessonCount});
    }
    catch (error) {
        return res.status(500).json({code: 500, message: `Error updating progress and getting upcoming lessons: ${error} `})
    }
}

module.exports = {
    getLessonProgress
}