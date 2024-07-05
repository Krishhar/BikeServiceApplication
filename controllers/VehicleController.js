const Vehicle = require('../models/Vehicle');

// @desc    save a new Vehicle
// @route   POST /vehicle
// @access  Private (only for customers)

const saveVehicle = async (req, res) => {
    const { brand, model, year, licensePlate, color } = req.body;

    try {
        const vehicle = new Vehicle({
            brand,
            model,
            year,
            licensePlate,
            color,
            customerId: req.user.id
        });

        await vehicle.save();
        res.json(vehicle);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @desc    get all saved vehicles of a customer
// @route   GET /vehicle
// @access  Private (only for customers)

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ customerId: req.user.id })

        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch services' });
    }
};

// @desc    Get specified vehicle for the authenticated customer
// @route   GET /vehicles/:id
// @access  Private (only for authenticated customer)

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch vehicle' });
    }
}

// @desc    Update specified vehicle for the authenticated customer
// @route   PUT /vehicle/:id
// @access  Private (only for authenticated customer)

const updateVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (vehicle.customerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to update this Vehicle' });
        }

        if (vehicle) {
            vehicle.brand = req.body.brand || vehicle.brand
            vehicle.model = req.body.model || vehicle.model
            vehicle.year = req.body.year || vehicle.year
            vehicle.licensePlate = req.body.licensePlate || vehicle.licensePlate
            vehicle.color = req.body.color || vehicle.color
        }

        const updatedVehicle = await vehicle.save()

        res.status(200).json(updatedVehicle);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update vehicle' });
    }
}

// @desc    delete specified vehicle for the authenticated customer
// @route   DELETE /vehicle/:id
// @access  Private (only for authenticated customer)

const deleteVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'vehicle not found' });
        }

        if (vehicle.customerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this vehicle' });
        }

        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Vehicle deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete vehicle' });
    }
};


module.exports = {saveVehicle, getAllVehicles, getVehicleById, updateVehicleById, deleteVehicleById}