const ordersRoute = require('express').Router()
const ordersController = require('./orders.controller')
const jwtMiddleware = require('../../../middleware/jwtPassport')
const productsValidationRule = require('../../../helpers/validation/rules/products')
const requestValidationMiddleware  = require('../../../middleware/requestValidation')

ordersRoute.post(
    '/',
    jwtMiddleware,
    ordersController.addOrder
)

module.exports = ordersRoute