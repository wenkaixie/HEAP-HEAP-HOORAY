const { db, admin } = require("../firebase/firebase.js");

const updateAvailability = async (req, res) => {
    const { instructorID, datetimes } = req.body;

    if (!instructorID || !Array.isArray(datetimes) || datetimes.length === 0) {
        return res.status(400).json({ code: 400, message: "Email and an array of datetimes are required" });
    }

    try {
        const instructorDoc = await db.collection('instructors').doc(instructorID);

        if (!instructorDoc) {
            return res.status(404).json({ code: 404, message: "No instructor found" });
        }

        // Iterate over the datetime array and convert each string to Firestore Timestamp
        const timestamps = datetimes.map(dt => admin.firestore.Timestamp.fromDate(new Date(dt)));

        // Update the unavailableTimeslots array with all timestamps
        const updatePromises = timestamps.map(timestamp => 
            instructorDoc.update({
                unavailableTimeslots: admin.firestore.FieldValue.arrayUnion(timestamp)
            })
        );

        await Promise.all(updatePromises);

        return res.status(200).json({code: 200, message: "Datetimes added to instructor's unavailableTimeslots"})

    }
    catch (error) {
        return res.status(500).json({ code: 500, message: `Error updating availability: ${error}` });
    }
};


module.exports = {
    updateAvailability
}