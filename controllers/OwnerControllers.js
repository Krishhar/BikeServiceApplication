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
            token:genToken(owner._id) 
        })
    }
    else {
        res.status(400);
        throw new Error("User not found");
    }
}

const authOwner = async(req,res) => {
    const {email,password} = req.body
    const owner = await Owner.findOnr({email})
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
}

module.exports = {regOwner}
