const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const CustomerSchema = new schema({
    role: { type: String, default: "Customer" },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    ph: { type: String, required: true },
    // storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', default: null },
}, { timestamps: true })

CustomerSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

CustomerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Customer = mongoose.model('Customer', CustomerSchema)
module.exports = Customer
