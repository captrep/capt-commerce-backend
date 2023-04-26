const { nanoid } = require('nanoid')
const { Product, Cart, Order } = require('../../../database/models')
const { successApi } = require('../../../utils/response')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler')

const addOrder = async (req, res, next) => {
    try {        
        const cartId = req.body.cart_id
        const userId = req.user.id
        console.log({cartId, userId})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addOrder
}