const { db, admin } = require("../firebase/firebase.js");

const addEmailToInstructorStudentList = async (req, res) => {
    const { studentDocId, instructorDocId } = req.body;

    try {
        // Add the studentDocId to the student list of the instructor
        await db.collection('instructors').doc(instructorDocId).update({
            studentList: studentDocId
        });

        // Optionally, add the instructorDocId to the student's document
        await db.collection('students').doc(studentDocId).update({
            instructor: admin.firestore.FieldValue.arrayUnion(instructorDocId)
        });
  
        return res.status(200).json({
        studentDocId,
        instructorDocId
        });
    } catch (error) {
        console.error('Instructor Booking Failed', error);
        return res.status(500).json({ code: 500, message: `'Instructor Booking Failed: ${error}` });
    }
}

module.exports = {
  addEmailToInstructorStudentList
};
