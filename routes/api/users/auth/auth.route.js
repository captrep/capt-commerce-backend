const authRoute = require('express').Router()
const authController = require('./auth.controller')

const usersValidationRule = require('../../../../helpers/validation/rules/users')
const requestValidationMiddleware = require('../../../../middleware/requestValidation')



authRoute.post(
    '/register',
    usersValidationRule.register,
    requestValidationMiddleware,
    authController.register
);
authRoute.post(
    '/login',
    usersValidationRule.login,
    requestValidationMiddleware, 
    authController.login
);

module.exports = authRoute;