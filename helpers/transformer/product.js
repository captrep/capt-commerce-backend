function list(payload) {
    return payload.map(products => {
        product = products.toJSON()

        return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            category_name: product.category.name
        }
    })
}

function detail(payload) {
    return {
        id: payload.id,
        name: payload.name,
        slug: payload.slug,
        desc: payload.desc,
        category_name: payload.category?.name,
        stock: payload.stock,
        price: payload.price,
        weight: payload.weight
    }
}

module.exports = {
    list,
    detail
}