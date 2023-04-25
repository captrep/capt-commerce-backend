const settingsRoute = require('express').Router()

settingsRoute.use('/address', require('./address/address.route'))
module.exports = settingsRoute