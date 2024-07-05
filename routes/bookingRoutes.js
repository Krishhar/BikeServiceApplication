const express = require('express')
const { protect, user } = require('../Middlewares/authMiddleware')
const { createBooking,
    getAllBookings,
    getBookingById,
    deleteBookingById
} = require('../controllers/BookingController')

const router = express.Router()

router.route('/').post(protect, createBooking).get(protect, user, getAllBookings)
router.route('/:id').get(protect,user,getBookingById).delete(protect,user,deleteBookingById)

module.exports = router