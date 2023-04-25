const addressRoute = require('express').Router()
const addressController = require('./address.controller')
const jwtMiddleware = require('../../../../../middleware/jwtPassport')
const usersValidationRule = require('../../../../../helpers/validation/rules/users')
const requestValidationMiddleware = require('../../../../../middleware/requestValidation')

addressRoute.get(
    '/',
    jwtMiddleware,
    addressController.addressInfo
)

addressRoute.post(
    '/',
    jwtMiddleware,
    usersValidationRule.address,
    requestValidationMiddleware,
    addressController.addAddress
)

addressRoute.put(
    '/:id',
    jwtMiddleware,
    usersValidationRule.address,
    requestValidationMiddleware,
    addressController.updateAddress
)

addressRoute.delete(
    '/:id',
    jwtMiddleware,
    addressController.removeAddress
)
module.exports = addressRoute