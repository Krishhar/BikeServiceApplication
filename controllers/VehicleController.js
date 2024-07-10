const Vehicle = require('../models/Vehicle');

// @desc    save a new Vehicle
// @route   POST /vehicle
// @access  Private (only for customers)
const saveVehicle = async (req, res) => {
    // Extract the vehicle details from the request body
    const { brand, model, year, licensePlate, color } = req.body;

    try {
        // Create a new vehicle with the provided details and the customer's ID
        const vehicle = new Vehicle({
            brand,
            model,
            year,
            licensePlate,
            color,
            customerId: req.user.id
        });

        // Save the new vehicle and return it in the response
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
        // Find all vehicles where the customerId matches the authenticated user's ID
        const vehicles = await Vehicle.find({ customerId: req.user.id })

        // Return the vehicles in the response
        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Vehicles' });
    }
};

// @desc    Get specified vehicle for the authenticated customer
// @route   GET /vehicles/:id
// @access  Private (only for authenticated customer)
const getVehicleById = async (req, res) => {
    try {
        // Find the vehicle by ID
        const vehicle = await Vehicle.findById(req.params.id)
        if (!vehicle) {
            // If the vehicle is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Return the vehicle in the response
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
        // Find the vehicle by ID
        const vehicle = await Vehicle.findById(req.params.id)
        if (!vehicle) {
            // If the vehicle is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Check if the authenticated user is the owner of the vehicle
        if (vehicle.customerId.toString() !== req.user.id) {
            // If the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ message: 'User not authorized to update this Vehicle' });
        }

        // Update the vehicle fields
        if (vehicle) {
            vehicle.brand = req.body.brand || vehicle.brand
            vehicle.model = req.body.model || vehicle.model
            vehicle.year = req.body.year || vehicle.year
            vehicle.licensePlate = req.body.licensePlate || vehicle.licensePlate
            vehicle.color = req.body.color || vehicle.color
        }

        // Save the updated vehicle and return it in the response
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
        // Find the vehicle by ID
        const vehicle = await Vehicle.findById(req.params.id);

        // If the vehicle is not found, return a 404 Not Found response
        if (!vehicle) {
            return res.status(404).json({ message: 'vehicle not found' });
        }

        // Check if the authenticated user is the owner of the vehicle
        if (vehicle.customerId.toString() !== req.user.id) {
            // If the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ message: 'User not authorized to delete this vehicle' });
        }

        // Delete the vehicle and return a success message
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Vehicle deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete vehicle' });
    }
};

// Export the vehicle-related functions
module.exports = { saveVehicle, getAllVehicles, getVehicleById, updateVehicleById, deleteVehicleById }
