function list(payload) {
    return payload.map(carts => {
        cart = carts.toJSON()

        return {
            id: cart.id,
            product: cart.product?.name,
            price: cart.product?.price,
            qty: cart.qty
        }
    })
}

module.exports = {
    list
}