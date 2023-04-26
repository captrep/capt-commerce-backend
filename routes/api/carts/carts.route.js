const cartsRoute = require('express').Router()
const cartsController = require('./carts.controller')
const jwtMiddleware = require('../../../middleware/jwtPassport')

cartsRoute.get(
    '/',
    jwtMiddleware,
    cartsController.getCart
)

cartsRoute.post(
    '/:id',
    jwtMiddleware,
    cartsController.addToCart
)

cartsRoute.put(
    '/',
    jwtMiddleware,
    cartsController.updateCart
)

cartsRoute.delete(
    '/:id',
    jwtMiddleware,
    cartsController.removeCart
)
module.exports = cartsRoute