const Customer = require('../models/Customer')
const genToken = require('../config/Token')

// @desc    Customer Registration
// @route   post customer/
// @access  Private

const regCustomer = async (req, res) => {
    try {
        const { name, email, password, ph } = req.body

        if (!name || !email || !password || !ph) {
            res.status(400).json({ message: "All fields are mandatory" });
            return;
        }

        const CustomerExists = await Customer.findOne({ email })

        if (CustomerExists) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        const customer = await Customer.create({
            name,
            email,
            password,
            ph,
        })

        if (customer) {
            res.status(201).json({
                _id: customer._id,
                role: customer.role,
                name: customer.name,
                email: customer.email,
                ph: customer.ph,
                token: genToken(customer._id, customer.role)
            })
        }
        else {
            res.status(400).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Customer login
// @route   post customer/login
// @access  Private

const authCustomer = async (req, res) => {
    try {
        const { email, password } = req.body
        const customer = await Customer.findOne({ email })
        if (customer && (await customer.matchPassword(password))) {
            res.json({
                _id: customer._id,
                role: customer.role,
                name: customer.name,
                email: customer.email,
                ph: customer.ph,
                token: genToken(customer._id, customer.role)
            });
        } else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get customer profile by ID
// @route   GET /customer/:id
// @access  Private

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id).select('-password')

        if (customer) {
            res.json(customer)
        } else {
            res.status(404).json({ message: 'Customer not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update cutsomer profile by ID
// @route   PUT /custoner/:id
// @access  Private

const updateCustomerById = async (req,res) => {
    try {
        const customer = await Customer.findById(req.params.id)

        if (customer) {
            customer.name = req.body.name || customer.name
            customer.email = req.body.email || customer.email
            customer.ph = req.body.ph || customer.ph
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10)
                customer.password = await bcrypt.hash(req.body.password, salt)
            }

            const updatedCustomer = await CSSCounterStyleRuleustomer.save()

            res.json({
                _id: updatedCustomer._id,
                name: updatedCustomer.name,
                email: updatedCustomer.email,
                ph: updatedCustomer.ph,
                role: updatedCustomer.role,
            })
        } else {
            res.status(404).json({ message: 'customer not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete customer by ID
// @route   DELETE /customer/:id
// @access  Private

const deleteCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)

        if (customer) {
            await Customer.findByIdAndDelete(req.params.id)
            res.json({ message: 'Customer profile deleted' })
        } else {
            res.status(404).json({ message: 'Customer not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { regCustomer, authCustomer, getCustomerById, updateCustomerById, deleteCustomerById }
