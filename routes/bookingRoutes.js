const express = require('express')
const { protect } = require('../Middlewares/authMiddleware')
const {createBooking} = require('../controllers/BookingController')

const router = express.Router()

router.route('/').post(protect, createBooking)

// .get(protect, getAllBooking)

module.exports = router