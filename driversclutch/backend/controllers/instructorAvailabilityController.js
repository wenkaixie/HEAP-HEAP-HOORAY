const { db, admin } = require("../firebase/firebase.js");

const updateAvailability = async (req, res) => {
    const { email, datetime } = req.body;

    if (!email || !datetime) {
        return res.status(400).json({ code: 400, message: "Email and datetime are required" });
    }

    try {
        const querySnapshot = await db.collection('instructors').where('email', '==', email).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ code: 404, message: "No instructor with given email found" });
        }

        const docRef = querySnapshot.docs[0].ref;

        //convert datetime string to Firestore timestamp object
        const timestamp = admin.firestore.Timestamp.fromDate(new Date(datetime));

        //update unavailableTimeslots array
        await docRef.update({
            unavailableTimeslots: admin.firestore.FieldValue.arrayUnion(timestamp)
        });

        return res.status(200).json({code: 200, message: "Datetime added to instructor's unavailableTimeslots"})

    }
    catch (error) {
        return res.status(500).json({ code: 500, message: `Error updating availability: ${error}` });
    }
};


module.exports = {
    updateAvailability
}