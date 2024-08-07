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

        const fullname = `${lastName} ${firstName}`;

        // Convert Firestore Timestamps to ISO 8601 strings
        const unavailableTimeslotsISO = unavailableTimeslots.map(timestamp => timestamp.toDate().toISOString());
        

        const studentDocRef = db.collection('students').doc(studentID);
        const studentDoc = await studentDocRef.get();

        if (!studentDoc.exists) {
            return res.status(404).json({ code: 404, message: 'No student found.' });
        }

        const completedLessons = studentDoc.data().completedLessons;
        const upcomingLessons = studentDoc.data().upcomingLessons;
        const completedLessonCount = completedLessons.length;
        const upcomingLessonCount = upcomingLessons.length;
        const totalLessonCount = upcomingLessonCount + completedLessonCount;

        // // Convert Firestore Timestamps to ISO 8601 strings
        // const completedLessonsISO = completedLessons.map(timestamp => timestamp.toDate().toISOString());

        return res.status(200).json({
        fullname: fullname,
        workStart: workStart,
        workEnd: workEnd,
        lessonDuration: lessonDuration,
        unavailableTimeslots: unavailableTimeslotsISO,
        completedLessonCount: completedLessonCount,
        totalLessonCount: totalLessonCount
        });
    } 

    catch (error) {
        return res.status(500).json({ code: 500, message: `Error updating availability: ${error}` });
    }
};


//after booking
const bookedTimeslotStudent = async (req, res) => {
    const {studentID, timeslots, balance, unavailableTimeslots} = req.body;
    if (!Array.isArray(timeslots) || timeslots.length === 0 || !studentID) {
        return res.status(400).json({code: 400, message: "Timeslots array is required"})
    }
    try {
        const studentDocRef  = db.collection("students").doc(studentID);

        // Iterate over the datetime array and convert each string to Firestore Timestamp
        const timestamps = timeslots.map(ts => admin.firestore.Timestamp.fromDate(new Date(ts)));

        // Update the unavailableTimeslots array with all timestamps
        const updatePromises = timestamps.map(timestamp => 
            studentDocRef .update({
                upcomingLessons: admin.firestore.FieldValue.arrayUnion(timestamp)
            })
        );

        await Promise.all(updatePromises);

        await studentDocRef .update({
            balance: balance
        });

        // Query instructors who have the student in their studentList
        const instructorSnapshot = await db.collection('instructors').where('studentList', 'array-contains', studentID).get();

        if (instructorSnapshot.empty) {
            return res.status(404).json({ code: 404, message: "No instructors found for the student." });
        }
        // convert unavailableTimeslot to firebase timestamps
        const unavailableTimeslotsFirestore = unavailableTimeslots.map(dt => admin.firestore.Timestamp.fromDate(new Date(dt)));
        // Update each instructor's unavailableTimeslots
        const instructorDocRef = instructorSnapshot.docs[0].ref;
        const instructorUpdatePromises = unavailableTimeslotsFirestore.map(timestamp =>
            instructorDocRef.update({
                unavailableTimeslots: admin.firestore.FieldValue.arrayUnion(timestamp)
            })
        );

        await Promise.all(instructorUpdatePromises);

        return res.status(200).json({code: 200, message: "Instructor unavailable timeslots and students' upcoming lessons and account balance are successfully updated "});
    }
    catch (error) {
        return res.status(500).json({ code: 500, message: "Error updating student's upcoming lesson: ${error}" });
    }
}

const bookedTimeslotInstructor = async (req, res) => {
    const {studentID, timeslots} = req.body;

    if (!Array.isArray(timeslots) || timeslots.length === 0 || !studentID ) {
        return res.status(400).json({code: 400, message: "StudentID, InstructorID and timeslots array are required"});
    }

    try {
        const timestamps = timeslots.map(ts => admin.firestore.Timestamp.fromDate(new Date(ts)));

        const studentDoc = await db.collection("students").doc(studentID).get();
        const instructorID = studentDoc.data().instructor;

        const instructorLessonsRef = db.collection('instructors')
            .doc(instructorID)
            .collection('upcomingLessons');

        const batch = db.batch();

        timestamps.forEach(timestamp => {
            const lessonData = {
                student: studentID,
                timeslot: timestamp
            };
            const lessonDocRef = instructorLessonsRef.doc();
            batch.set(lessonDocRef, lessonData);
        });

        await batch.commit();

        return res.status(200).json({code: 200, message: 'Upcoming lesson added successfully'});
    }
    catch (error) {
        return res.status(500).json({code:500, message: `Error updating instructor's upcoming lesson: ${error}`});
    }
}


module.exports = {
    getInstructorTimeslots,
    bookedTimeslotStudent,
    bookedTimeslotInstructor
}