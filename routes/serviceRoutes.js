const express = require('express')
const { protect, admin, user } = require('../Middlewares/authMiddleware')
const { createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    searchServices
} = require('../controllers/ServiceControllers')

const router = express.Router()

//service routes
router.route('/').post(protect, admin, createService).get(protect, admin, getAllServices)
router.get('/search', protect, user, searchServices)
router.route('/:id').get(protect, admin, getServiceById)
    .put(protect, admin, updateServiceById) 
    .delete(protect, admin, deleteServiceById) 
  
module.exports = router  