const Booking = require('../models/Bookings');
const Customer = require('../models/Customer');
const Service = require('../models/Services');
const Vehicle = require('../models/Vehicle');
const Owner = require('../models/Owner');
const nodemailer = require('nodemailer');

// Function to send an email
const sendBookingEmail = (ownerEmail, bookingDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { customer, vehicle, date } = bookingDetails;
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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
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
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        const service = await Service.findById(serviceId).populate('ownerId');
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        const vehicle = await Vehicle.findOne({ customerId });
        if (!vehicle) {
            return res.status(404).json({ msg: 'Vehicle not found' });
        }

        const newBooking = new Booking({
            customerId,
            serviceId,
            vehicleId: vehicle._id,
            date,
            status: 'pending'
        });

        await newBooking.save();

        const ownerEmail = service.ownerId.email;

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

        res.status(201).json(newBooking);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }
};

// @desc    Get all bookings for the authenticated customer
// @route   GET /bookings
// @access  Private (only for authenticated customer)

const getAllBookings = async (req, res) => {
    try {
        const  booking= await Booking.find({ customerId: req.user.id })

        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch bookings' })
    }
} 

//@desc Get specified sbooking for the authenticated customer
// @route   GET /booking/:id
// @access  Private (only for authenticated customer)

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Booking' });
    }
}


// @desc    Delete specified services for the authenticated customer
// @route   DELETE /booking/:id
// @access  Private (only for authenticated customer)

const deleteBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.customerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this booking' });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Booking deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Booking' });
    }
};


module.exports = { createBooking, getAllBookings, getBookingById,deleteBookingById };
