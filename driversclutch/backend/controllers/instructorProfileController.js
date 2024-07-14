// havent test
const { db, storage } = require("../firebase/firebase.js");

const getInfo = async (req,res) => {
    const instructorID = req.query.id;

    try {
        const instructorDoc = await db.collection("instructors").doc(instructorID).get();
        if (!instructorDoc) {
            return res.status(404).json({message: "Instructor not found"});
        }
        const allInfo = instructorDoc.data();
        const {studentList, unavailableTimeslots, ...filteredInfo} = allInfo;
        return res.status(200).json({message: 'Info retrieved successfully', data: filteredInfo});
    }
    catch (error) {
        return res.status(500).json({message: `Error fetching instructor's info: ${error}`});
    }
}

const updateInfo = async (req, res) => {
    const {instructorID, carModel, carPlate, drivingCentre, enrolmentFee, lessonDuration, lessonFee, maximumStudents, passRate, phoneNumber, transmissionType, workStart, workEnd, locations} = req.body;

    // if(!studentID || !firstname || !lastname || !birthdate) {
    //     return res.status(400).json({code: 400, message: "Student Doc ID and updated firstname/lastname/birthdate required"})
    // }

    try {
        await db.collection("instructors").doc(instructorID).update({
            carModel: carModel,
            carPlate: carPlate,
            drivingCentre: drivingCentre,
            enrolmentFee: enrolmentFee,
            lessonDuration: lessonDuration,
            lessonFee: lessonFee,
            maximumStudents: maximumStudents,
            passRate: passRate,
            phoneNumber: phoneNumber,
            transmissionType: transmissionType,
            workStart: workStart,
            workEnd: workEnd,
            locations: locations
        });

        return res.status(200).json({code: 200, message: "Information successfully is updated"});
    }
    catch (error) {
        return res.status(500).json({code: 500, message: `Error updating info: ${error}`});
    }
}


const updateProfilePic = async(req, res) => {
    const file = req.file;
    const instructorID = req.query.id;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
  
    try {
        const bucket = storage.bucket();
        const fileName = `images/${file.originalname}`;
        const fileRef = bucket.file(fileName);

        // Upload the file to Firebase Storage
        await fileRef.save(file.buffer);

        // Get the file's download URL
        const downloadURL = await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-01-2500'
        });

        // Save the download URL to Firestore in the "instructors" collection
        const docRef = db.collection('instructors').doc(instructorID);
        await docRef.set({
        profileImage: downloadURL[0]
        // updatedAt: admin.db.FieldValue.serverTimestamp()
        }, { merge: true });

        res.status(200).send('File uploaded successfully!');
    }
    catch (error) {
        res.status(500).send('Error uploading file: ' + error.message);
    }
}

module.exports = {
    getInfo,
    updateInfo,
    updateProfilePic
}