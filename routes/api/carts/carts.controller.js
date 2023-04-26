const { nanoid } = require('nanoid')
const { Cart, CartItem, Product } = require('../../../database/models')
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

        let cart = await Cart.findOne({
            where: {
                user_id
            }
        })

        if (!cart) {
            cart = await Cart.create({
                id: nanoid(),
                user_id,
            })
        }

        const cartItem = await CartItem.create({
            id: nanoid(),
            cart_id: cart.id,
            product_id,
            qty

        })

        res.status(201).json(
            successApi(201, 'Created', cartItem)
        )
    } catch (error) {
        next(error)
    }
}

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({
            where: {
                user_id: req.user.id
            }
        })
        if (!cart) throw new ApiErrorHandler(404, 'CART NOT FOUND')

        const cartItems = await CartItem.findAll({
            where: {
                cart_id: cart.id
            },
            include: {
                model: Product,
                as: 'product'
            }
        })
        res.status(200).json(
            successApi(200, 'Ok', cartTransformer.list(cartItems))
        )
    } catch (error) {
        next(error)
    }
}

const updateCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({
            where: {
                user_id: req.user.id
            }
        })
        if (!cart) throw new ApiErrorHandler(404, 'CART NOT FOUND')

        const { cart_item_id, qty } = req.body
        const cartItem = await CartItem.findOne({
            where: {
                id: cart_item_id
            }
        })
        const product = await Product.findByPk(cartItem.product_id)
        if (parseInt(qty) > product.stock) throw new ApiErrorHandler(422, 'OUT OF STOCK')

        cartItem.qty = parseInt(qty)
        await cartItem.save()

        res.status(200).json(
            successApi(200, 'Ok', cartItem)
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
                user_id: userId
            }
        })
        if (!cart) throw new ApiErrorHandler(404, 'CART NOT FOUND')

        const cartItem = await CartItem.findOne({
            where: {
                id: cartId,
            }
        })
        
        await cartItem.destroy()

        res.status(200).json(
            successApi(200, 'Ok', cartItem)
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