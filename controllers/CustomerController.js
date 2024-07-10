const Customer = require('../models/Customer')
const genToken = require('../config/Token')

// @desc    Customer Registration
// @route   post customer/
// @access  Private
const regCustomer = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const { name, email, password, ph } = req.body

        // Check if all required fields are provided
        if (!name || !email || !password || !ph) {
            res.status(400).json({ message: "All fields are mandatory" });
            return;
        }

        // Check if the email already exists
        const CustomerExists = await Customer.findOne({ email })
        if (CustomerExists) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        // Create a new customer
        const customer = await Customer.create({
            name,
            email,
            password,
            ph,
        })

        // If the customer is created successfully, return the customer details and a token
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
        // If the customer is not found, return a 400 Bad Request response
        else {
            res.status(400).json({ message: "Customer not found" });
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
}

// @desc    Customer login
// @route   post customer/login
// @access  Private
const authCustomer = async (req, res) => {
    try {
        // Extract the email and password from the request body
        const { email, password } = req.body

        // Find the customer by email
        const customer = await Customer.findOne({ email })

        // If the customer exists and the password matches, return the customer details and a token
        if (customer && (await customer.matchPassword(password))) {
            res.json({
                _id: customer._id,
                role: customer.role, 
                name: customer.name,
                email: customer.email,
                ph: customer.ph,
                token: genToken(customer._id, customer.role)
            });
        }
        // If the email or password is invalid, return a 401 Unauthorized response
        else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message }); 
    }
} 

// @desc    Get customer profile by ID
// @route   GET /customer/:id
// @access  Private
const getCustomerById = async (req, res) => {
    try {
        // Find the customer by ID, excluding the password field
        const customer = await Customer.findById(req.user.id).select('-password')

        // If the customer is found, return the customer details
        if (customer) {
            res.json(customer)
        }
        // If the customer is not found, return a 404 Not Found response
        else {
            res.status(404).json({ message: 'Customer not found' })
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update cutsomer profile by ID
// @route   PUT /custoner/:id
// @access  Private
const updateCustomerById = async (req, res) => {
    try {
        // Find the customer by ID
        const customer = await Customer.findById(req.params.id)

        // If the customer is found, update the fields
        if (customer) {
            customer.name = req.body.name || customer.name
            customer.email = req.body.email || customer.email
            customer.ph = req.body.ph || customer.ph
            if (req.body.password) {
                // Hash the new password
                const salt = await bcrypt.genSalt(10)
                customer.password = await bcrypt.hash(req.body.password, salt)
            }

            // Save the updated customer
            const updatedCustomer = await customer.save()

            // Return the updated customer details
            res.json({
                _id: updatedCustomer._id,
                name: updatedCustomer.name,
                email: updatedCustomer.email,
                ph: updatedCustomer.ph,
                role: updatedCustomer.role,
            })
        }
        // If the customer is not found, return a 404 Not Found response
        else {
            res.status(404).json({ message: 'customer not found' })
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete customer by ID
// @route   DELETE /customer/:id
// @access  Private
const deleteCustomerById = async (req, res) => {
    try {
        // Find the customer by ID
        const customer = await Customer.findById(req.params.id)

        // If the customer is found, delete the customer
        if (customer) {
            await Customer.findByIdAndDelete(req.params.id)
            res.json({ message: 'Customer profile deleted' })
        }
        // If the customer is not found, return a 404 Not Found response
        else {
            res.status(404).json({ message: 'Customer not found' })
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
}

// Export the customer-related functions
module.exports = { regCustomer, authCustomer, getCustomerById, updateCustomerById, deleteCustomerById }
