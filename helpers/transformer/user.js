function detail(payload) {
    return {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        mobile: payload.mobile,
        image: payload.image,
        role: payload.role
    }
}

module.exports = {
    detail
}