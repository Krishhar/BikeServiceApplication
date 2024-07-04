const express = require('express')
const { regOwner, authOwner, getOwnerById, updateOwnerById, deleteOwnerById } = require('../controllers/OwnerControllers')
const { protect, admin } = require('../Middlewares/authMiddleware')
const router = express.Router()

router.route('/').post(regOwner)
router.post('/login',authOwner)
router.route('/:id').get(protect, admin, getOwnerById).put(protect, admin, updateOwnerById).delete(protect,admin,deleteOwnerById)

module.exports = router  