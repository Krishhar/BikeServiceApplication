const Owner = require('../models/Owner')
const genToken = require('../config/Token')

const regOwner = async (req, res) => {
    const { name, email, password, ph, address } = req.body

    if (!name || !email || !password || !ph || !address) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const OwnerExists = await Owner.findOne({email})

    if(OwnerExists){
        res.status(400)
        throw new Error("Email already exists")
    }

    const owner = await Owner.create({
        name,
        email,
        password,
        ph,
        address,
    })

    if(owner){
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
        res.status(400);
        throw new Error("User not found");
    }
}

// @desc    owner login
// @route   post owner/
// @access  Private
const authOwner = async(req,res) => {
    const {email,password} = req.body
    const owner = await Owner.findOne({email})
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
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
}

// @desc    Get owner profile by ID
// @route   GET /owners/:id
// @access  Private
const getOwnerById = async(req,res) => {
    const owner = await Owner.findById(req.params.id).select('-password')

    if (owner) {
        res.json(owner)
    } else {
        res.status(404)
        throw new Error('Owner not found')
    }
}

// @desc    Update owner profile by ID
// @route   PUT /owners/:id
// @access  Private
const updateOwnerById = async(req,res) => {
    const owner = await Owner.findById(req.params.id)

    if(owner){
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
            storeId:updatedOwner.storeId
        })
    } else {
        res.status(404)
        throw new Error('Owner not found')
    }
}

// @desc    Delete owner by ID
// @route   DELETE /owners/:id
// @access  Private
const deleteOwnerById = async (req, res) => {
    const owner = await Owner.findById(req.params.id)

    if (owner) {
        await Owner.findByIdAndDelete(req.params.id)
        res.json({ message: 'Owner profile deleted' })
    } else {
        res.status(404)
        throw new Error('Owner not found')
    }
}

module.exports = {regOwner, authOwner, getOwnerById, updateOwnerById,deleteOwnerById}
