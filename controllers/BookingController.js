const Booking = require('../models/Bookings');
const Customer = require('../models/Customer');
const Service = require('../models/Services');
const Vehicle = require('../models/Vehicle');
const nodemailer = require('nodemailer');

// Function to send an email notifying the owner about a booking
const sendBookingEmail = (ownerEmail, bookingDetails) => {
    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Extract the relevant booking details
    const { customer, vehicle, date } = bookingDetails;

    // Prepare the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ownerEmail,
        subject: 'New Booking Confirmation',
        text: `A new booking has been made. Details:\n
               Customer Name: ${customer.name}\n
               Customer Phone: ${customer.phone}\n
               Customer Email: ${customer.email}\n
               Vehicle Brand: ${vehicle.brand}\n
               Vehicle Model: ${vehicle.model}\n
               Vehicle Year: ${vehicle.year}\n
               Vehicle License Plate: ${vehicle.licensePlate}\n
               Vehicle Color: ${vehicle.color}\n
               Booking Date: ${date}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Function to send an email notifying the customer about the delivery
const sendDeliveryEmail = (customerEmail, customer, vehicle) => {
    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Prepare the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Your Vehicle is ready for delivery',
        text: `Dear ${customer.name},

Your vehicle is ready for delivery. Please find the details below:

Customer Name: ${customer.name}
Vehicle Brand: ${vehicle.brand}
Vehicle Model: ${vehicle.model}
Vehicle Year: ${vehicle.year}
Vehicle License Plate: ${vehicle.licensePlate}

Thank you for choosing our service.

Best regards,
Bike Service`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// @desc    Create a new Booking
// @route   POST /booking
// @access  Private (only for customers)

const createBooking = async (req, res) => {
    const { serviceId, date } = req.body;
    const customerId = req.user.id;

    try {
        // Find the customer
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        // Find the service
        const service = await Service.findById(serviceId).populate('ownerId', 'name ph email');
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        // Find the customer's vehicle
        const vehicle = await Vehicle.findOne({ customerId });
        if (!vehicle) {
            return res.status(404).json({ msg: 'Vehicle not found' });
        }

        // Create a new booking
        const newBooking = new Booking({
            customerId,
            serviceId,
            ownerId: service.ownerId,
            vehicleId: vehicle._id,
            date,
            status: 'pending'
        });

        // Save the new booking
        await newBooking.save();

        // Get the owner's email
        const ownerEmail = service.ownerId.email;

        // Send an email to the owner about the new booking
        sendBookingEmail(ownerEmail, {
            customer: {
                name: customer.name,
                phone: customer.ph,
                email: customer.email
            },
            vehicle: {
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                licensePlate: vehicle.licensePlate,
                color: vehicle.color
            },
            date
        });

        // Return the new booking
        res.status(201).json(newBooking);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @desc    Get all bookings for the authenticated customer
// @route   GET /bookings
// @access  Private (only for authenticated customer)

const getAllBookings = async (req, res) => {
    try {
        // Find all bookings for the authenticated customer, and populate the serviceId field
        const booking = await Booking.find({ customerId: req.user.id }).populate('serviceId', 'name price description')

        // Return the bookings in the response
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch bookings' })
    }
}

// @desc    Get specified booking for the authenticated customer
// @route   GET /booking/:id
// @access  Private (only for authenticated customer)

const getBookingById = async (req, res) => {
    try {
        // Find the booking by its ID
        const booking = await Booking.findById(req.params.id)
        if (!booking) {
            // If the booking is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Return the booking in the response
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Booking' });
    }
}

// @desc    Get all previous bookings for the authenticated customer
// @route   GET /bookings/previous
// @access  Private (only for authenticated customer)

const getPreviousBookings = async (req, res) => {
    try {
        // Find all completed bookings for the authenticated customer, sorted in descending order by date
        const bookings = await Booking.find({
            customerId: req.user.id,
            status: 'completed'
        }).sort({ date: -1 });

        // Return the previous bookings in the response
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
};

// @desc    Update the status of a specified booking
// @route   PUT /booking/owner/:id
// @access  Private (only for authenticated owners)

const updateBookingStatus = async (req, res) => {
    const allowedStatuses = ['ready for delivery', 'completed'];

    try {
        // Find the booking by its ID
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            // If the booking is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Find the service associated with the booking
        const service = await Service.findById(booking.serviceId);
        if (!service || service.ownerId.toString() !== req.user.id) {
            // If the service is not found or the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ message: 'User not authorized to update this booking' });
        }

        // Get the new status from the request body
        const newStatus = req.body.status;
        if (!allowedStatuses.includes(newStatus)) {
            // If the new status is not allowed, return a 400 Bad Request response
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Prevent editing if the current status is 'completed'
        if (booking.status === 'completed') {
            return res.status(400).json({ message: 'Cannot edit a completed booking' });
        }

        // Ensure 'completed' status can only come after 'ready for delivery'
        if (newStatus === 'completed' && booking.status !== 'ready for delivery') {
            return res.status(400).json({ message: 'Cannot mark as completed before marking as ready for delivery' });
        }

        // Update the booking status
        booking.status = newStatus;
        const updatedBooking = await booking.save();

        // Send an email notification to the customer when the status is updated to 'ready for delivery'
        if (newStatus === 'ready for delivery') {
            const customer = await Customer.findById(booking.customerId);
            const vehicle = await Vehicle.findById(booking.vehicleId);
            sendDeliveryEmail(customer.email, customer, vehicle);
        }

        // Return the updated booking in the response
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update booking status' });
    }
};

// @desc    Delete specified services for the authenticated customer
// @route   DELETE /booking/:id
// @access  Private (only for authenticated customer)

const deleteBookingById = async (req, res) => {
    try {
        // Find the booking by its ID
        const booking = await Booking.findById(req.params.id)

        if (!booking) {
            // If the booking is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Booking not found' })
        }

        if (booking.customerId.toString() !== req.user.id) {
            // If the user is not authorized to delete the booking, return a 403 Forbidden response
            return res.status(403).json({ message: 'User not authorized to delete this booking' })
        }

        // Delete the booking
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Booking deleted successfully' })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Booking' })
    }
}

// @desc    Get all bookings for a specific owner
// @route   GET /booking/owner
// @access  Private (only for owners)

const getAllBookingsForOwner = async (req, res) => {
    try {
        // Find all services owned by the authenticated user
        const services = await Service.find({ ownerId: req.user.id })
        const serviceIds = services.map(service => service._id)

        // Find all bookings for the services owned by the authenticated user
        const bookings = await Booking.find({ serviceId: { $in: serviceIds } })
            .populate('customerId', 'name email ph')
            .populate('serviceId', 'name')
            .populate('vehicleId', 'brand model year licensePlate color');

        // Return the bookings in the response
        res.status(200).json(bookings)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

// @desc    Get a specific booking for a specific owner
// @route   GET /booking/owner/:id
// @access  Private (only for owners)

const getBookingByIdForOwner = async (req, res) => {
    try {
        // Find the booking by its ID, and populate the related fields
        const booking = await Booking.findById(req.params.id)
            .populate('serviceId', 'name')
            .populate('customerId', 'name email ph')
            .populate('vehicleId', 'brand model year licensePlate color')

        // If the booking is not found, return a 404 Not Found response
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' })
        }

        // Find the service associated with the booking
        const service = await Service.findById(booking.serviceId)

        // If the service is not found or the authenticated user is not the owner, return a 403 Forbidden response
        if (!service || service.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'You do not have permission to view this booking' })
        }

        // Return the booking in the response
        res.status(200).json(booking)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}



module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    getPreviousBookings,
    deleteBookingById,
    getAllBookingsForOwner,
    getBookingByIdForOwner,
    updateBookingStatus
}
