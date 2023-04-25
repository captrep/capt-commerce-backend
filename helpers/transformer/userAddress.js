function detail(payload) {
    return {
        id: payload.id,
        address_line1: payload.address_line1,
        address_line2: payload.address_line2,
        city: payload.city,
        postalcode: payload.postalcode,
        country: payload.country,
        mobile: payload.mobile
    }
}

function list(payload) {
    return payload.map(addreses => {
        address = addreses.toJSON()

        return {
            id: address.id,
            address_line1: address.address_line1,
            address_line2: address.address_line2,
            city: address.city,
            postalcode: address.postalcode,
            country: address.country,
            mobile: address.mobile
        }
    })
}

module.exports = {
    detail,
    list
}