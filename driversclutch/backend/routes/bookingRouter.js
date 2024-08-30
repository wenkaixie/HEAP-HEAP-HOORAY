const express = require('express');
const router = express.Router();
const { makeBooking, confirmBooking, confirmBookingNonscrape } = require('../controllers/bookingController.js');

router.get('/make-booking', makeBooking);
router.post('/confirm-booking', confirmBooking);
router.post('/confirm-booking-nonscrape', confirmBookingNonscrape);

module.exports = router;
