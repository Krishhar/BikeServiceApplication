const express = require('express')
const { protect } = require('../Middlewares/authMiddleware')
const { createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    searchServices
} = require('../controllers/ServiceControllers')

const router = express.Router()

//service routes
router.route('/').post(protect, createService).get(protect, getAllServices)
router.get('/search', protect, searchServices)
router.route('/:id').get(protect, getServiceById)
    .put(protect, updateServiceById) 
    .delete(protect, deleteServiceById)

module.exports = router 