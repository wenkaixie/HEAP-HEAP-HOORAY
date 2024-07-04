const express = require("express");
const {updateBirthdate, updateFirstName, updateLastName} = require("../controllers/studentProfileController.js");

const router = express.Router();

router.put('/firstname', updateFirstName);

router.put('/lastname', updateLastName);

router.put('/birthdate', updateBirthdate)

module.exports = router;