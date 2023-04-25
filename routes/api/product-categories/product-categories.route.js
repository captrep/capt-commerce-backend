const productCategoriesRoute = require('express').Router()
const productCategoriesController = require('./product-categories.controller')
const jwtMiddleware = require('../../../middleware/jwtPassport')
const verifyRole = require('../../../middleware/verifyRole')
const productCategoriesValidationRule = require('../../../helpers/validation/rules/product-categories')
const requestValidationMiddleware = require('../../../middleware/requestValidation')

productCategoriesRoute.post(
    '/',
    jwtMiddleware,
    verifyRole(['admin']),
    productCategoriesValidationRule.create,
    requestValidationMiddleware,
    productCategoriesController.createProductCategory
)

productCategoriesRoute.get(
    '/',
    jwtMiddleware,
    verifyRole(['admin']),
    productCategoriesController.index
)

productCategoriesRoute.put(
    '/:id',
    jwtMiddleware,
    verifyRole(['admin']),
    productCategoriesValidationRule.create,
    requestValidationMiddleware,
    productCategoriesController.updateProductCategory
)

productCategoriesRoute.delete(
    '/:id',
    jwtMiddleware,
    verifyRole(['admin']),
    productCategoriesController.removeProductCategory
)
module.exports = productCategoriesRoute