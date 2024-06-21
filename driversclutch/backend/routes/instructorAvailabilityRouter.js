const express = require("express");
const { updateAvailability } = require("../controllers/instructorAvailabilityController.js")

const router = express.Router();


router.post('/', updateAvailability);


module.exports = router;