const express = require("express");
const { getInstructorTimeslots, bookedTimeslotStudent, bookedTimeslotInstructor } = require("../controllers/lessonBookingController.js")

const router = express.Router();


router.get('/', getInstructorTimeslots);

router.post('/updateStudent', bookedTimeslotStudent);

router.post('/updateInstructor', bookedTimeslotInstructor);

module.exports = router;