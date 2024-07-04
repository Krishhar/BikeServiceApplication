const express = require('express')
const { protect } = require('../Middlewares/authMiddleware')
const { createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById
} = require('../controllers/ServiceControllers')

const router = express.Router()

//service routes
router.route('/').post(protect, createService).get(protect, getAllServices)
router.route('/:id').get(protect, getServiceById)
    .put(protect, updateServiceById)
    .delete(protect, deleteServiceById)

module.exports = router 