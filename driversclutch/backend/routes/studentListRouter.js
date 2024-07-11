const express = require("express");
const { getAllStudentInfo } = require("../controllers/studentListController.js");

const router = express.Router();

router.get('/', getAllStudentInfo);

module.exports = router;