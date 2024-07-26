const { db, admin } = require("../firebase/firebase.js")

const getAutoInstructors = async (req, res) => {
    const transmissionType = "Auto";
    try {
        const querySnapshot = await db
            .collection("instructors")
            .where("transmissionType", "==", transmissionType)
            .get();

        if (querySnapshot.empty) {
            return res.status(404).json({message: `No instructors teaching ${transmissionType}`})
        }

        const instructors = [];
        querySnapshot.forEach((doc) => {
            const instructorData = doc.data();
            const { birthdate, transmissionType, workStart, workEnd, pendingStudents, studentList, maximumStudents, unavailableTimeslots, upcomingLessons, ...filteredData } = instructorData;
            const studentCount = studentList.length;
            const remainingSlots = maximumStudents - studentCount;
            const updatedFilteredData = {
                ...filteredData,
                remainingSlots
            };
            instructors.push(updatedFilteredData);
        })

        res.status(200).json({ code: 200, data: instructors });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Error getting instructors" });
      }
}

const getManualInstructors = async (req, res) => {
    const transmissionType = "Manual";
    try {
        const querySnapshot = await db
            .collection("instructors")
            .where("transmissionType", "==", transmissionType)
            .get();

        if (querySnapshot.empty) {
            return res.status(404).json({message: `No instructors teaching ${transmissionType}`})
        }

        const instructors = [];
        querySnapshot.forEach((doc) => {
            const instructorData = doc.data();
            const { birthdate, transmissionType, workStart, workEnd, pendingStudents, studentList, maximumStudents, unavailableTimeslots, upcomingLessons, ...filteredData } = instructorData;
            const studentCount = studentList.length;
            const remainingSlots = maximumStudents - studentCount;
            const updatedFilteredData = {
                ...filteredData,
                remainingSlots
            };
            instructors.push(updatedFilteredData);
        })

        res.status(200).json({ code: 200, data: instructors });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Error getting instructors" });
      }
}


const addIDToInstructorStudentList = async (req, res) => {
    const { studentDocId, instructorDocId } = req.body;

    try {
        // Add the instructorDocId to the student's document
        await db.collection('students').doc(studentDocId).update({
            instructor: instructorDocId
        });

        // Add the studentDocId to the student list of the instructor
        await db.collection('instructors').doc(instructorDocId).update({
            studentList: admin.firestore.FieldValue.arrayUnion(studentDocId)
        });

        return res.status(200).json({ code: 200, message: `Instructor successfully added to ${studentDocId} and student successfully added to ${instructorDocId}'s student list`});

    } catch (error) {
        console.error('Instructor Booking Failed', error);
        return res.status(500).json({ code: 500, message: `'Instructor Booking Failed: ${error}` });
    }
}


module.exports = {
    getAutoInstructors,
    getManualInstructors,
    addIDToInstructorStudentList
}

