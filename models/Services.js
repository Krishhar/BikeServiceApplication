const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceSchema = new schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;