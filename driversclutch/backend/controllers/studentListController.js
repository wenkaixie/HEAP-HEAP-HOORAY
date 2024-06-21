//function to add student email to the instructor list
const { db } = require("../firebase/firebase.js")

async function addEmailToInstructorStudentList(studentDocId, instructorDocId) {
    try {
      // Retrieve the student's email
      //To amend if it becomes stored in a session
      const studentDoc = await db.collection('students').doc(studentDocId).get();

      const studentData = studentDoc.data();
      const email = studentData.email;
      console.log('Student Email:', email);
  
      // Add the email to the student list of the instructor
      // Assume that i have the instructorDocID for now
      await db.collection('instructors').doc(instructorDocId).update({
        studentList: admin.firestore.FieldValue.arrayUnion(email)
      });

      await.db.collection('students').doc(studentDocId).update({
        instructor: admin.firestore.FieldValue.arrayUnion(instructorDocId)
      });
  
      console.log('Instructor Booking Successful');
    } catch (error) {
      console.error('Instructor Booking Failed', error);
      throw new Error('Instructor Booking Failed');
    }
}

module.exports = {
    addEmailToInstructorStudentList
}