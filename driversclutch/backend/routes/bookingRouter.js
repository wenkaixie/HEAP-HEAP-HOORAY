const express = require('express');
const router = express.Router();
const {makeBooking} = require('../controllers/bookingController.js');

router.post('/make-booking', makeBooking);

module.exports = router;
