const productsRoute = require('express').Router()
const productsController = require('./products.controller')
const jwtMiddleware = require('../../../middleware/jwtPassport')
const verifyRole = require('../../../middleware/verifyRole')
const productsValidationRule = require('../../../helpers/validation/rules/products')
const requestValidationMiddleware  = require('../../../middleware/requestValidation')

productsRoute.get(
    '/',
    productsController.getAllProducts
)

productsRoute.get(
    '/:slug',
    productsController.detailProduct
)

productsRoute.post(
    '/',
    jwtMiddleware,
    verifyRole(['admin']),
    productsValidationRule.create,
    requestValidationMiddleware,
    productsController.createProduct
)

productsRoute.put(
    '/:id',
    jwtMiddleware,
    verifyRole(['admin']),
    productsValidationRule.update,
    requestValidationMiddleware,
    productsController.updateProduct
)

productsRoute.delete(
    '/:id',
    jwtMiddleware,
    verifyRole(['admin']),
    productsController.removeProduct
)

module.exports = productsRoute