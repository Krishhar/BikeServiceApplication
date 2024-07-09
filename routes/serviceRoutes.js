const express = require('express');
const { protect, admin, user } = require('../Middlewares/authMiddleware');
const {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    searchServices,
    getLowestPriceServices,
    previousServices
} = require('../controllers/ServiceControllers');

const router = express.Router();

// Service routes

// Create a new service and get all services (admin only)
router.route('/')
    .post(protect, admin, createService)
    .get(protect, admin, getAllServices);

// Get previous services for a customer
router.get('/customer', protect, user, previousServices);

// Get services with the lowest price
router.get('/lowest-price', protect, user, getLowestPriceServices);

// Search services
router.get('/search', protect, user, searchServices);

// Get, update, and delete a specific service by ID (admin only)
router.route('/:id')
    .get(protect, admin, getServiceById)
    .put(protect, admin, updateServiceById)
    .delete(protect, admin, deleteServiceById);

module.exports = router;
