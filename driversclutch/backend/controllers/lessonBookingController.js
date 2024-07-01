const { db, admin } = require("../firebase/firebase.js");

const getInstructorTimeslots = async (req, res) => {
    const studentID = req.query.id; // Assuming the student email is passed as a query parameter

    if (!studentID) {
        return res.status(400).json({code: 400, message: 'Student id is required.'});
    }

    try {
        const querySnapshot = await db.collection('instructors')
            .where('studentList', 'array-contains', studentID)
            .get();

        if (querySnapshot.empty) {
            return res.status(404).json({code: 404, message: 'No instructor found for the given student email.'});
        }

        // Assuming only one document contains the specific student email
        const doc = querySnapshot.docs[0];

        //retrieve only specified fields
        const { firstName, lastName, unavailableTimeslots } = doc.data();

        //get instructor fullname accounting for chi/eng name but probs nid to edit function / just dc
        
        // if (firstName.indexOf(' ') == -1) {
        //     const fullname = `${firstName} ${lastName}`;
        // } else {
        //     const fullname = `${lastName} ${firstName}`;
        // }
        const fullname = `${lastName} ${firstName}`;

        // Convert Firestore Timestamps to ISO 8601 strings
        const unavailableTimeslotsISO = unavailableTimeslots.map(timestamp => timestamp.toDate().toISOString());

        return res.status(200).json({
        fullname,
        unavailableTimeslots: unavailableTimeslotsISO
        });
    } 

    catch (error) {
        return res.status(500).json({ code: 500, message: `Error updating availability: ${error}` });
    }
};


//after booking
const bookedTimeslotStudent = async (req, res) => {
    const {studentID, timeslots} = req.body;
    if (!Array.isArray(timeslots) || timeslots.length === 0) {
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
    }
    catch (error) {
        return res.status(500).json({ code: 500, message: `Error updating student's upcoming lesson: ${error}` });
    }
}

module.exports = {
    getInstructorTimeslots,
    bookedTimeslotStudent
}