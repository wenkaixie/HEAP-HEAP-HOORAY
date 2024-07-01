const { db, admin } = require("../firebase/firebase.js");

const updateAvailability = async (req, res) => {
    const { email, datetimes } = req.body;

    if (!email || !Array.isArray(datetimes) || datetimes.length === 0) {
        return res.status(400).json({ code: 400, message: "Email and an array of datetimes are required" });
    }

    try {
        const querySnapshot = await db.collection('instructors').where('email', '==', email).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ code: 404, message: "No instructor with given email found" });
        }

        const docRef = querySnapshot.docs[0].ref;

        // Iterate over the datetime array and convert each string to Firestore Timestamp
        const timestamps = datetimes.map(dt => admin.firestore.Timestamp.fromDate(new Date(dt)));

        // Update the unavailableTimeslots array with all timestamps
        const updatePromises = timestamps.map(timestamp => 
            docRef.update({
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