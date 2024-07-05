const express = require("express");
const {updateInfo, getInfo} = require("../controllers/studentProfileController.js");

const router = express.Router();

router.get('/', getInfo);

router.put('/update', updateInfo);

module.exports = router;