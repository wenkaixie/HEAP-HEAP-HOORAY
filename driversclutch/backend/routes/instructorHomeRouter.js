const express = require("express");
const {getUpcomingLessons} = require("../controllers/instructorHomeController.js");

const router = express.Router();

router.get('/', getUpcomingLessons);

module.exports = router;