const Service = require('../models/Services')

// @desc    Create a new service
// @route   POST /services
// @access  Private (only for owners)

const createService = async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        res.status(400).json({ message: 'All fields are mandatory' });
        return;
    }

    try {
        const service = new Service({
            name,
            description,
            price,
            ownerId: req.user._id,
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all services for the authenticated owner
// @route   GET /services
// @access  Private (only for authenticated owners)

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ ownerId: req.user.id })

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
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

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
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (service.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to update this service' });
        }

        if (service) {
            service.name = req.body.name || service.name
            service.description = req.body.description || service.description
            service.price = req.body.price || service.price
        }

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
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (service.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this service' });
        }

        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Service deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete service' }); 
    }
};

const searchServices = async (req, res) => {
    const { query } = req.query;

    try {
        const services = await Service.find({
            name: { $regex: query, $options: 'i' }
        });

        if (services.length === 0) {
            return res.status(404).json({ msg: 'No services found' });
        }

        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    searchServices
}