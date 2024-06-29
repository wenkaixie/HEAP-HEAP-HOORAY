const express = require("express");
const { getAutoInstructors, getManualInstructors } = require("../controllers/instructorListController.js")

const router = express.Router();


router.get('/auto', getAutoInstructors);

router.get('/manual', getManualInstructors);

module.exports = router;