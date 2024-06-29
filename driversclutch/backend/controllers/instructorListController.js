const { db } = require("../firebase/firebase.js")

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
            const { birthdate, email, lessonDuration, transmissionType, workStart, workEnd, pendingStudents, studentList, unavailableTimeslots, upcomingLessons, ...filteredData } = instructorData;
            instructors.push(filteredData);
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
            const { birthdate, email, lessonDuration, transmissionType, workStart, workEnd, unavailableTimeslots, upcomingLessons, ...filteredData } = instructorData;
            //mayb add maxstudents and remove pendingstudents
            instructors.push(filteredData);
        })

        res.status(200).json({ code: 200, data: instructors });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Error getting instructors" });
      }
}



module.exports = {
    getAutoInstructors,
    getManualInstructors
}