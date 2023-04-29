const { nanoid } = require('nanoid')
const { Cart, Product, CartItem, Order, OrderLine, UserAddress } = require('../../../database/models')
const { successApi } = require('../../../utils/response')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler')
const sequelize = require('../../../database/connection')
const orderTransformer = require('../../../helpers/transformer/order')

const addOrder = async (req, res, next) => {
    try {        
        const cartId = req.body.cart_id
        const userAddress = await UserAddress.findByPk(req.body.address)
        const shippingAddress = `${userAddress.address_line1}, ${userAddress.address_line2}, ${userAddress.city}, ${userAddress.postalcode}, ${userAddress.mobile}`

        const cartItem = await CartItem.findAll({
            where:{
                cart_id: cartId
            },
            include:{
                model: Product,
                as: 'product'
            }
        })
        if (cartItem.length === 0) throw new ApiErrorHandler(404, 'CART NOT FOUND')

        const orderLine = []
        const orderTotal = cartItem.reduce((result, cart) => {
            let total = parseInt(cart.product.price) * parseInt(cart.qty)
            let obj = {product_id: cart.product_id, qty: cart.qty, price:total}
            orderLine.push(obj)
            return result += total
        }, 0)
        
        const result = await sequelize.transaction(async (t) => {
            const order = await Order.create({
                id: nanoid(),
                user_id: req.user.id,
                order_date: Date.now(),
                payment_method: 'tes',
                shipping_address: shippingAddress,
                shipping_method: 'tes',
                order_total: orderTotal,
                order_status: 'tes'
            },{transaction: t})
    
            for (let i = 0; i < orderLine.length; i++) {
                await OrderLine.create({
                    id: nanoid(),
                    product_id: orderLine[i].product_id,
                    order_id: order.id,
                    qty: orderLine[i].qty,
                    price: orderLine[i].price
                }, {transaction: t})
                
                await CartItem.destroy({
                    where: {
                        cart_id: cartId
                    },
                    transaction: t
                })
            }

            const cart = await Cart.findByPk(cartId)
            await cart.destroy({transaction:t})
            return order
        })

        res.status(201).json(
            successApi(201, 'Created', result)
        )

    } catch (error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findAll({
            where: {
                user_id: req.user.id
            }
        })
        if (order.length === 0) throw new ApiErrorHandler(404, 'ORDER NOT FOUND')
        
        res.status(200).json(
            successApi(200, 'Ok', orderTransformer.list(order))
        )
    } catch (error) {
        next(error)
    }
}

const getOrderDetail = async (req, res, next) => {
    try {
        const orderDetail = await OrderLine.findAll({
            where: {
                order_id : req.params.id
            },
            include: [
                {
                    model: Product,
                    as: 'product'
                },
                {
                    model: Order,
                    as: 'order'
                }
            ]
        })
        if (!orderDetail) throw new ApiErrorHandler(404, 'ORDER DETAILS NOT FOUND') 
        
        console.log(orderDetail[0].order.order_status)
        res.status(200).json(
            successApi(200, 'Ok', {
                order_status: orderDetail[0].order.order_status,
                payment_method: orderDetail[0].order.payment_method,
                shipping_method: orderDetail[0].order.shipping_method,
                shipping_address: orderDetail[0].order.shipping_address,
                orders: orderTransformer.detail(orderDetail)
            })
        )
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addOrder,
    getOrder,
    getOrderDetail
}