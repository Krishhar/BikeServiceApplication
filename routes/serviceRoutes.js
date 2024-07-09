const express = require('express');
const { protect, admin, user } = require('../Middlewares/authMiddleware');
const {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    searchServices,
    getLowestPriceServices
} = require('../controllers/ServiceControllers');

const router = express.Router();

// Service routes
router.route('/')
    .post(protect, admin, createService)
    .get(protect, admin, getAllServices); // This is for getting all services by admins

router.get('/lowest-price', protect, user, getLowestPriceServices); // Route for lowest price services
router.get('/search', protect, user, searchServices); // Route for search services

router.route('/:id')
    .get(protect, admin, getServiceById)
    .put(protect, admin, updateServiceById)
    .delete(protect, admin, deleteServiceById);

module.exports = router;
