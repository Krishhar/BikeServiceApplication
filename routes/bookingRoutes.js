const express = require('express')
const { protect, user, admin } = require('../Middlewares/authMiddleware')
const { createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking,
    getPreviousBookings,
    deleteBookingById,
    getAllBookingsForOwner,
    getBookingByIdForOwner,
    updateBookingStatus
} = require('../controllers/BookingController')

const router = express.Router()


//Owner routes
router.route('/owner')
    .get(protect, admin, getAllBookingsForOwner)

router.route('/owner/:id')
    .get(protect, admin, getBookingByIdForOwner)
    .put(protect, admin, updateBookingStatus)
    .delete(protect,admin,cancelBooking)

// Customer routes

router.route('/previous').get(protect, user, getPreviousBookings)

router.route('/').post(protect, user, createBooking)
    .get(protect, user, getAllBookings)

router.route('/:id').get(protect, user, getBookingById)
    .delete(protect, user, deleteBookingById)







module.exports = router