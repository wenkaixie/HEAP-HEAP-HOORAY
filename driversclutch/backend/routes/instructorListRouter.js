const express = require("express");
const { getAutoInstructors, getManualInstructors, addIDToInstructorStudentList } = require("../controllers/instructorListController.js")

const router = express.Router();


router.get('/auto', getAutoInstructors);

router.get('/manual', getManualInstructors);

router.post('/selected', addIDToInstructorStudentList)

module.exports = router;


