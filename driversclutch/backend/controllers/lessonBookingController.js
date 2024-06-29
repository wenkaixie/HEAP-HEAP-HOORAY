const { db } = require("../firebase/firebase.js");

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



module.exports = {
    getInstructorTimeslots
}