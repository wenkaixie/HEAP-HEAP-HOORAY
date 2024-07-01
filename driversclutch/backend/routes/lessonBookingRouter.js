const express = require("express");
const { getInstructorTimeslots, bookedTimeslotStudent } = require("../controllers/lessonBookingController.js")

const router = express.Router();


router.get('/', getInstructorTimeslots);

router.post('/updateStudents', bookedTimeslotStudent);

// router.post('/updateInstructor', bookedTimeslotInstructor);

module.exports = router;