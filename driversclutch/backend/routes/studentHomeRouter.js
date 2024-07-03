const express = require("express");
const { getLessonProgress } = require("../controllers/studentHomeController.js");

const router = express.Router();

router.get('/lessons', getLessonProgress);

module.exports = router;