function list(payload) {
    return payload.map(orders => {
        order = orders.toJSON()
        return {
            id: order.id,
            order_date: order.order_date,
            order_total: order.order_total,
            order_status: order.order_status,
        }
    })
}

function detail(payload) {
    return payload.map(orderDetails => {
        orderDetail = orderDetails.toJSON()

        return {
            id: orderDetail.id,
            product: orderDetail.product.name,
            qty: orderDetail.qty,
            price: orderDetail.price
        }
    })
}
module.exports = {
    list,
    detail
}