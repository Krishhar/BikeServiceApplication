const express = require('express');
const { protect, user } = require('../Middlewares/authMiddleware');
const { saveVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById } = require('../controllers/VehicleController');
const router = express.Router();

router.route('/').post(protect, user, saveVehicle).get(protect, user, getAllVehicles)
router.route('/:id')
    .get(protect, user, getVehicleById)
    .put(protect, user, updateVehicleById)
    .delete(protect, user, deleteVehicleById)

 
module.exports = router;