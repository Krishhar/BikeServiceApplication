const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookingSchema = schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'ready for delivery', 'completed'] },
    createdAt: { type: Date, default: Date.now }
},
{timestamps:true})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;