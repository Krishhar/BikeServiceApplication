const jwt = require('jsonwebtoken')
const Owner = require('../models/Owner')
const Customer = require('../models/Customer')

// Middleware function to protect routes
const protect = async (req, res, next) => {
    let token

    // Check if the authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the authorization header
            token = req.headers.authorization.split(' ')[1]

            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.SECRET)

            // Find the owner by the decoded ID and exclude the password field
            req.user = await Owner.findById(decoded.id).select('-password')

            // If the user is not found as an owner, try finding the customer
            if (!req.user) {
                req.user = await Customer.findById(decoded.id).select('-password')
            }

            // Call the next middleware function
            next()
        } catch (error) {
            console.error('Error:', error)

            // Set the response status to 401 (Unauthorized)
            res.status(401)

            // Throw an error with the message
            throw new Error('Not authorized, token failed')
        }
    }

    // If no token is found, set the response status to 401 (Unauthorized) and throw an error
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}

// Middleware function to check if the user is an owner
const admin = (req, res, next) => {
    // Check if the user exists and has the role of 'Owner'
    if (req.user && req.user.role === 'Owner') {
        console.log(req.user)

        // Call the next middleware function
        next()
    } else {
        // Set the response status to 401 (Unauthorized) and throw an error
        res.status(401)
        throw new Error('Not authorized as an owner')
    }
}

// Middleware function to check if the user is a customer
const user = (req, res, next) => {
    // Check if the user exists and has the role of 'Customer'
    if (req.user && req.user.role === 'Customer') {
        console.log(req.user)

        // Call the next middleware function
        next()
    } else {
        // Set the response status to 401 (Unauthorized) and throw an error
        res.status(401)
        throw new Error('Not authorized as an Customer')
    }
}

// Export the middleware functions
module.exports = { protect, admin, user }
