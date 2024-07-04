const mongoose = require('mongoose')
const schema = mongoose.Schema

const OwnerSchema = schema({
    role: {type:"String", default:"Owner"},
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    ph: { type: String, required: true },
    address: { type: String, required: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', default: null },
    
},{ timestaps: true })

const Owner = mongoose.model('Owner',OwnerSchema)
module.exports = Owner