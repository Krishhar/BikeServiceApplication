const mongoose = require('mongoose');
const schema = mongoose.Schema

const vehicleSchema = schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true, unique: true },
    color: { type: String },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
},
{timestamps: true})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)
module.exports = Vehicle
