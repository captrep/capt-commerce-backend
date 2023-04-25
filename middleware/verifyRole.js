const ApiErrorHandler = require("../helpers/ApiErrorHandler")

const verifyRoles = (roles) => {
    return (req, res, next) => {
        try {
            const { role } = req.user
            if (!roles.includes(role)) {
                throw new ApiErrorHandler(403, "ROLE NOT ALLOWED")
            }
            next()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = verifyRoles