const Booking = require('../models/Bookings');
const Service = require('../models/Services')

// @desc    Create a new service
// @route   POST /services
// @access  Private (only for owners)
const createService = async (req, res) => {
    // Extract the required fields from the request body
    const { name, description, price } = req.body;

    // Check if all required fields are provided
    if (!name || !description || !price) {
        res.status(400).json({ message: 'All fields are mandatory' });
        return;
    }

    try {
        // Create a new service with the provided information and the owner's ID
        const service = new Service({
            name,
            description,
            price,
            ownerId: req.user._id,
        });

        // Save the new service and return it in the response
        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all services for the authenticated owner
// @route   GET /services
// @access  Private (only for authenticated owners)
const getAllServices = async (req, res) => {
    try {
        // Find all services where the ownerId matches the authenticated user's ID
        const services = await Service.find({ ownerId: req.user.id })

        // Return the services in the response
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch services' });
    }
};

// @desc    Get specified services for the authenticated owner
// @route   GET /services/:id
// @access  Private (only for authenticated owners)
const getServiceById = async (req, res) => {
    try {
        // Find the service by ID
        const service = await Service.findById(req.params.id)
        if (!service) {
            // If the service is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Service not found' });
        }

        // Return the service in the response
        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch service' });
    }
}

// @desc    Update specified services for the authenticated owner
// @route   PUT /services/:id
// @access  Private (only for authenticated owners)
const updateServiceById = async (req, res) => {
    try {
        // Find the service by ID
        const service = await Service.findById(req.params.id)
        if (!service) {
            // If the service is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Service not found' });
        }

        // Check if the authenticated user is the owner of the service
        if (service.ownerId.toString() !== req.user.id) {
            // If the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ message: 'User not authorized to update this service' });
        }

        // Update the service fields
        if (service) {
            service.name = req.body.name || service.name
            service.description = req.body.description || service.description
            service.price = req.body.price || service.price
        }

        // Save the updated service and return it in the response
        const updatedService = await service.save()
        res.status(200).json(updatedService);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update service' });
    }
}

// @desc    Delete specified services for the authenticated owner
// @route   DELETE /services/:id
// @access  Private (only for authenticated owners)
const deleteServiceById = async (req, res) => {
    try {
        // Find the service by ID
        const service = await Service.findById(req.params.id);

        // If the service is not found, return a 404 Not Found response
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Check if the authenticated user is the owner of the service
        if (service.ownerId.toString() !== req.user.id) {
            // If the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ message: 'User not authorized to delete this service' });
        }

        // Delete the service and return a success message
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Service deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete service' });
    }
};

// @desc    Search services
// @route   GET /api/services/search
// @access  Private
const searchServices = async (req, res) => {
    const { query } = req.query;

    try {
        // Find services where the name matches the search query (case-insensitive)
        const services = await Service.find({
            name: { $regex: query, $options: 'i' }
        });

        // If no services are found, return a 404 Not Found response
        if (services.length === 0) {
            return res.status(404).json({ msg: 'No services found' });
        }

        // Return the found services
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get services with the lowest price
// @route   GET /api/services/lowest-price
// @access  Private
const getLowestPriceServices = async (req, res) => {
    // Find the 6 services with the lowest price and return them
    const services = await Service.find().sort({ price: 1 }).limit(6);
    res.json(services);
}

const previousServices = async (req, res) => {
    try {
        // Find bookings with status "completed" and populate the service and vehicle details
        const bookings = await Booking.find({ customerId: req.user.id, status: 'completed' })
            .populate('serviceId')
            .populate('vehicleId')

        // Return the bookings in the response
        res.json(bookings);
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
};

// Export the service-related functions
module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    searchServices,
    getLowestPriceServices,
    previousServices
}
