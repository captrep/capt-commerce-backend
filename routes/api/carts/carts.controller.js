const { nanoid } = require('nanoid')
const { Cart, Product } = require('../../../database/models')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler')
const { successApi } = require('../../../utils/response')
const cartTransformer = require('../../../helpers/transformer/cart')

const addToCart = async (req, res, next) => {
    try {
        const product_id = req.params.id
        const user_id = req.user.id
        const { qty } = req.body
        const product = await Product.findByPk(product_id)

        if (!product) throw new ApiErrorHandler(404, 'PRODUCT NOT FOUND')
        if (parseInt(qty) > product.stock) throw new ApiErrorHandler(422, 'OUT OF STOCK')

        const cart = await Cart.create({
            id: nanoid(),
            user_id,
            product_id,
            qty

        })

        res.status(201).json(
            successApi(201, 'Created', cart)
        )
    } catch (error) {
        next(error)
    }
}

const getCart = async (req, res, next) => {
    try {
        const carts = await Cart.findAll({
            where: {
                user_id: req.user.id
            },
            include: {
                model: Product,
                as: 'product'
            }
        })
        if (carts.length === 0) throw new ApiErrorHandler(404, 'CART NOT FOUND')
        res.status(200).json(
            successApi(200, 'Ok', cartTransformer.list(carts))
        )
    } catch (error) {
        next(error)
    }
}

const updateCart = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const userId = req.user.id
        const { qty } = req.body
        const cart = await Cart.findOne({
            where: {
                id: cartId,
                user_id: userId
            }
        })

        if (!cart) throw new ApiErrorHandler(404, 'CART NOT FOUND')
        const product = await Product.findByPk(cart.product_id)
        if (parseInt(qty) > product.stock) throw new ApiErrorHandler(422, 'OUT OF STOCK')

        cart.qty = parseInt(qty)
        await cart.save()

        res.status(200).json(
            successApi(200, 'Ok', cart)
        )
    } catch (error) {
        next(error)
    }
}

const removeCart = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const userId = req.user.id
        const cart = await Cart.findOne({
            where: {
                id: cartId,
                user_id: userId
            }
        })
        if (!cart) throw new ApiErrorHandler(404, 'CART NOT FOUND')
        await cart.destroy()

        res.status(200).json(
            successApi(200, 'Ok', cart)
        )
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCart
}