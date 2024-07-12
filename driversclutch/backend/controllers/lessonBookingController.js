const { db, admin } = require("../firebase/firebase.js");

const getInstructorTimeslots = async (req, res) => {
    const studentID = req.query.id; // Assuming the student email is passed as a query parameter

    if (!studentID) {
        return res.status(400).json({code: 400, message: 'Student id is required.'});
    }

    try {
        const instructorQuerySnapshot = await db.collection('instructors')
            .where('studentList', 'array-contains', studentID)
            .get();

        if (instructorQuerySnapshot.empty) {
            return res.status(404).json({code: 404, message: 'No instructor found for the given student email.'});
        }

        // Assuming only one document contains the specific student email
        const instructorDoc = instructorQuerySnapshot.docs[0];

        //retrieve only specified fields
        const { firstName, lastName, workStart, workEnd, lessonDuration, unavailableTimeslots = []} = instructorDoc.data();

        //get instructor fullname accounting for chi/eng name but probs nid to edit function / just dc
        // if (firstName.indexOf(' ') == -1) {
        //     const fullname = `${firstName} ${lastName}`;
        // } else {
        //     const fullname = `${lastName} ${firstName}`;
        // }
        const fullname = `${lastName} ${firstName}`;

        // Convert Firestore Timestamps to ISO 8601 strings
        const unavailableTimeslotsISO = unavailableTimeslots.map(timestamp => timestamp.toDate().toISOString());

        const studentDocRef = db.collection('students').doc(studentID);
        const studentDoc = await studentDocRef.get();

        if (!studentDoc.exists) {
            return res.status(404).json({ code: 404, message: 'No student found.' });
        }

        const { completedLessons = [] } = studentDoc.data();

        // Convert Firestore Timestamps to ISO 8601 strings
        const completedLessonsISO = completedLessons.map(timestamp => timestamp.toDate().toISOString());

        return res.status(200).json({
        fullname: fullname,
        workStart: workStart,
        workEnd: workEnd,
        lessonDuration: lessonDuration,
        unavailableTimeslots: unavailableTimeslotsISO,
        completedLessons: completedLessonsISO
        });
    } 

    catch (error) {
        return res.status(500).json({ code: 500, message: `Error updating availability: ${error}` });
    }
};


//after booking
const bookedTimeslotStudent = async (req, res) => {
    const {studentID, timeslots, balance} = req.body;
    if (!Array.isArray(timeslots) || timeslots.length === 0 || !studentID || !balance) {
        return res.status(400).json({code: 400, message: "Timeslots array is required"})
    }
    try {
        const docRef = db.collection("students").doc(studentID);

        // Iterate over the datetime array and convert each string to Firestore Timestamp
        const timestamps = timeslots.map(ts => admin.firestore.Timestamp.fromDate(new Date(ts)));

        // Update the unavailableTimeslots array with all timestamps
        const updatePromises = timestamps.map(timestamp => 
            docRef.update({
                upcomingLessons: admin.firestore.FieldValue.arrayUnion(timestamp)
            })
        );

        await Promise.all(updatePromises);

        await docRef.update({
            balance: balance
        });

        return res.status(200).json({code: 200, message: "Students' upcoming lessons and account balance are successfully updated "});
    }
    catch (error) {
        return res.status(500).json({ code: 500, message: `Error updating student's upcoming lesson: ${error}` });
    }
}

const bookedTimeslotInstructor = async (req, res) => {
    const {studentID, instructorID, timeslots} = req.body;

    if (!Array.isArray(timeslots) || timeslots.length === 0 || !studentID || !instructorID) {
        return res.status(400).json({code: 400, message: "StudentID, InstructorID and timeslots array are required"});
    }

    try {
        const timestamps = timeslots.map(ts => admin.firestore.Timestamp.fromDate(new Date(ts)));

        const lessonData = {
            student: studentID,
            timeslots: timestamps
        };
        
        await db.collection('instructors')
            .doc(instructorID)
            .collection('upcomingLessons')
            .add(lessonData);

        return res.status(200).json({code: 200, message: 'Upcoming lesson added successfully'});
    }
    catch (error) {
        return res
            .status(500)
            .json({code:500, message: `Error updating instructor's upcoming lesson: ${error}`});
    }
}


module.exports = {
    getInstructorTimeslots,
    bookedTimeslotStudent,
    bookedTimeslotInstructor
}