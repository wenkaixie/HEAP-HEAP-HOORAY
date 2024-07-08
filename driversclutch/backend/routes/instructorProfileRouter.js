const express = require("express");
const {getInfo, updateInfo} = require("../controllers/instructorProfileController.js");

const router = express.Router();

router.get('/', getInfo);

router.put('/update', updateInfo);

module.exports = router;