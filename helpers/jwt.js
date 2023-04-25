const jwt = require('jsonwebtoken')


const generateJwtToken = (id) => jwt.sign({id}, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' })


module.exports = { generateJwtToken }