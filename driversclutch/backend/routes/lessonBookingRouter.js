const express = require("express");
const { getInstructorTimeslots } = require("../controllers/lessonBookingController.js")

const router = express.Router();


router.get('/', getInstructorTimeslots);


module.exports = router;