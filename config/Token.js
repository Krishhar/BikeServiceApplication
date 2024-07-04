const jwt = require('jsonwebtoken')

const genToken = (id, role) => {
    return jwt.sign({id, role},process.env.SECRET, {
        expiresIn : '1d',
    })
}

module.exports = genToken 