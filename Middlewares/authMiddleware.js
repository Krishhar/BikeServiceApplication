const jwt = require('jsonwebtoken')
const Owner = require('../models/Owner')
const Customer = require('../models/Customer')

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { 
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.SECRET)
            req.user = await Owner.findById(decoded.id).select('-password')
            
            if(!req.user)
            {
                req.user = await Customer.findById(decoded.id).select('-password')
            }

            next()
        } catch (error) {
            console.error('Error:', error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Owner') {
        console.log(req.user)
        next()
    } else { 
        res.status(401)
        throw new Error('Not authorized as an owner')
    }
}

const user = (req, res, next) => {
    if (req.user && req.user.role === 'Customer') {
        console.log(req.user)
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an Customer')
    }
}

module.exports = { protect, admin, user }
