const { db } = require("../firebase/firebase.js");

const getInfo = async (req, res) => {
	const studentID = req.query.id;

	// try {
	//     const studentDoc = await db.collection("students").doc(studentID).get();
	//     if (!studentDoc) {
	//         return res.status(404).json({code: 404, message: "Student not found"})
	//     }
	//     const studentInfo = studentDoc.data();
	//     const {upcomingLessons, completedLessons, ...filteredData } = studentInfo;
	//     return res.status(200).json({code: 200, data: filteredData});
	// }
	try {
		// Fetch student document
		const studentDoc = await db
			.collection("students")
			.doc(studentID)
			.get();
		if (!studentDoc.exists) {
			return res.status(404).json({ code: 404, message: "Student not found" });
		}
		const studentInfo = studentDoc.data();
		const { upcomingLessons, completedLessons, instructor, ...filteredData } =
			studentInfo;

		let fullname = "";
		// Fetch instructor document
		const instructorDoc = await db
			.collection("instructors")
			.doc(instructor)
			.get();

		// console.log(instructor);
		if (!instructorDoc.exists) {
			// return res.status(404).json({ code: 404, message: "Instructor not found" });
			fullname = "";
		}

		const { firstName, lastName = [] } = instructorDoc.data();
		fullname = `${lastName} ${firstName}`;

		// Add instructor full name to the response data
		filteredData.instructorFullName = fullname;

		return res.status(200).json({ code: 200, data: filteredData });
	} catch (error) {
		return res.status(404).send(`Error getting info: ${error}`);
	}
};

const updateInfo = async (req, res) => {
	const { studentID, firstname, lastname, birthdate } = req.body;

	if (!studentID || !firstname || !lastname || !birthdate) {
		return res
			.status(400)
			.json({
				code: 400,
				message:
					"Student Doc ID and updated firstname/lastname/birthdate required",
			});
	}

	try {
		await db.collection("students").doc(studentID).update({
			firstName: firstname,
			lastName: lastname,
			birthdate: birthdate,
		});
		return res
			.status(200)
			.json({ code: 200, message: "Information successfully is updated" });
	} catch (error) {
		return res
			.status(500)
			.json({ code: 500, message: `Error updating info: ${error}` });
	}
};

module.exports = {
	updateInfo,
	getInfo,
};
