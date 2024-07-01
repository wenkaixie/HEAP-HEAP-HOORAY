//router to add student email to the instructor list
const express = require("express");
const router = express.Router();
const {addEmailToInstructorStudentList} = require("../controllers/studentListController.js")

router.post('/success', addEmailToInstructorStudentList);

module.exports = router;