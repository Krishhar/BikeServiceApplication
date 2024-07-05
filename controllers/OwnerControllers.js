const Owner = require('../models/Owner')
const genToken = require('../config/Token')

// @desc    owner Registration
// @route   post owner/
// @access  Private

const regOwner = async (req, res) => {
    try {
        const { name, email, password, ph, address } = req.body

        if (!name || !email || !password || !ph || !address) {
            res.status(400).json({ message: "All fields are mandatory" });
            return;
        }

        const OwnerExists = await Owner.findOne({ email })

        if (OwnerExists) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        const owner = await Owner.create({
            name,
            email,
            password,
            ph,
            address,
        })

        if (owner) {
            res.status(201).json({
                _id: owner._id,
                role: owner.role,
                name: owner.name,
                email: owner.email,
                ph: owner.ph,
                address: owner.address,
                storeId: owner.storeId,
                token: genToken(owner._id, owner.role)
            })
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    owner login
// @route   post owner/login
// @access  Private

const authOwner = async (req, res) => {
    try {
        const { email, password } = req.body
        const owner = await Owner.findOne({ email })
        if (owner && (await owner.matchPassword(password))) {
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
        } else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get owner profile by ID
// @route   GET /owners/:id
// @access  Private

const getOwnerById = async (req, res) => {
    try {
        const owner = await Owner.findById(req.user.id).select('-password')

        if (owner) {
            res.json(owner)
        } else {
            res.status(404).json({ message: 'Owner not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update owner profile by ID
// @route   PUT /owners/:id
// @access  Private

const updateOwnerById = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id)

        if (owner) {
            owner.name = req.body.name || owner.name
            owner.email = req.body.email || owner.email
            owner.ph = req.body.ph || owner.ph
            owner.address = req.body.address || owner.address
            owner.storeId = owner.storeId
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10)
                owner.password = await bcrypt.hash(req.body.password, salt)
            }

            const updatedOwner = await owner.save()

            res.json({
                _id: updatedOwner._id,
                name: updatedOwner.name,
                email: updatedOwner.email,
                ph: updatedOwner.ph,
                address: updatedOwner.address,
                role: updatedOwner.role,
                storeId: updatedOwner.storeId
            })
        } else {
            res.status(404).json({ message: 'Owner not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete owner by ID
// @route   DELETE /owners/:id
// @access  Private

const deleteOwnerById = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id)

        if (owner) {
            await Owner.findByIdAndDelete(req.params.id)
            res.json({ message: 'Owner profile deleted' })
        } else {
            res.status(404).json({ message: 'Owner not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { regOwner, authOwner, getOwnerById, updateOwnerById, deleteOwnerById }
