const Owner = require('../models/Owner')
const genToken = require('../config/Token')

// @desc    owner Registration
// @route   post owner/
// @access  Private
const regOwner = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const { name, email, password, ph, maxLimit ,address } = req.body

        // Check if all required fields are provided
        if (!name || !email || !password || !ph) {
            res.status(400).json({ message: "All fields are mandatory" });
            return;
        }

        // Check if the email already exists
        const OwnerExists = await Owner.findOne({ email })
        if (OwnerExists) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        // Create a new owner
        const owner = await Owner.create({
            name,
            email,
            password,
            ph,
            maxLimit,
            address,
        })

        // If the owner is created successfully, return the owner details and a token
        if (owner) {
            res.status(201).json({
                _id: owner._id,
                role: owner.role,
                name: owner.name,
                email: owner.email,
                ph: owner.ph,
                maxLimit: owner.maxLimit,
                address: owner.address,
                storeId: owner.storeId,
                token: genToken(owner._id, owner.role)
            })
        }
        // If the owner is not found, return a 400 Bad Request response
        else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
}

// @desc    owner login
// @route   post owner/login
// @access  Private
const authOwner = async (req, res) => {
    try {
        // Extract the email and password from the request body
        const { email, password } = req.body

        // Find the owner by email
        const owner = await Owner.findOne({ email })
        if (owner && (await owner.matchPassword(password))) {
            // If the owner exists and the password matches, return the owner details and a token
            res.json({
                _id: owner._id,
                role: owner.role,
                name: owner.name,
                email: owner.email,
                ph: owner.ph,
                address: owner.address,
                storeId: owner.storeId,
                token: genToken(owner._id, owner.role)
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

// @desc    Get owner profile by ID
// @route   GET /owners/:id
// @access  Private
const getOwnerById = async (req, res) => { 
    try {
        // Find the owner by ID, excluding the password field
        const owner = await Owner.findById(req.user.id).select('-password')

        // If the owner is found, return the owner details
        if (owner) {
            res.json(owner)
        }
        // If the owner is not found, return a 404 Not Found response
        else {
            res.status(404).json({ message: 'Owner not found' }) 
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update owner profile by ID
// @route   PUT /owners/:id
// @access  Private
const updateOwnerById = async (req, res) => {
    try {
        // Find the owner by ID
        const owner = await Owner.findById(req.params.id)

        // If the owner is found, update the fields
        if (owner) {
            owner.name = req.body.name || owner.name
            owner.email = req.body.email || owner.email
            owner.ph = req.body.ph || owner.ph
            owner.address = req.body.address || owner.address
            owner.storeId = owner.storeId
            if (req.body.password) {
                // Hash the new password
                const salt = await bcrypt.genSalt(10)
                owner.password = await bcrypt.hash(req.body.password, salt)
            }

            // Save the updated owner
            const updatedOwner = await owner.save()

            // Return the updated owner details
            res.json({
                _id: updatedOwner._id,
                name: updatedOwner.name,
                email: updatedOwner.email,
                ph: updatedOwner.ph,
                address: updatedOwner.address,
                role: updatedOwner.role,
                storeId: updatedOwner.storeId
            })
        }
        // If the owner is not found, return a 404 Not Found response
        else {
            res.status(404).json({ message: 'Owner not found' })
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete owner by ID
// @route   DELETE /owners/:id
// @access  Private
const deleteOwnerById = async (req, res) => {
    try {
        // Find the owner by ID
        const owner = await Owner.findById(req.params.id)

        // If the owner is found, delete the owner
        if (owner) {
            await Owner.findByIdAndDelete(req.params.id)
            res.json({ message: 'Owner profile deleted' })
        }
        // If the owner is not found, return a 404 Not Found response
        else {
            res.status(404).json({ message: 'Owner not found' })
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
} 

// Export the owner-related functions
module.exports = { regOwner, authOwner, getOwnerById, updateOwnerById, deleteOwnerById }
