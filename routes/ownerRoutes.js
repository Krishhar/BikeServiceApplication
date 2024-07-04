const express = require('express')
const { regOwner } = require('../controllers/OwnerControllers')
const router = express.Router()

router.route('/').post(regOwner)
router.post('/login')

module.exports = router