const express = require('express')
const { protect, user } = require('../Middlewares/authMiddleware')
const { regCustomer, 
    authCustomer, 
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
} = require('../controllers/CustomerController')
const router = express.Router()

router.route('/').post(regCustomer)
router.post('/login', authCustomer)
router.route('/:id').get(protect, user, getCustomerById)
.put(protect,user,updateCustomerById).delete(protect,user,deleteCustomerById)

module.exports = router