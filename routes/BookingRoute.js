const express = require("express");
const {
    getBooking,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../controllers/Booking.js");
const router = express.Router();

router.get('/bookings', getBooking);
router.get('/bookings/:id', getBookingById);
router.post('/bookings', createBooking);
router.patch('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

module.exports = router;