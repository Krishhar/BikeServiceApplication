const jwt = require('jsonwebtoken')

const genToken = (id) => {
    return jwt.sign({id},process.env.SECRET, {
        expiresIn : '1d',
    })
}

module.exports = genToken