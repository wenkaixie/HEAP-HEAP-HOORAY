const express = require('express');
const router = express.Router();
const { makeBooking, confirmBooking } = require('../controllers/bookingController.js');

router.get('/make-booking', makeBooking);
router.post('/confirm-booking', confirmBooking);

module.exports = router;
