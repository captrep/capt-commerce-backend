const profileRoute = require('express').Router()
const profileController = require('./profile.controller')
const jwtMiddleware = require('../../../../middleware/jwtPassport')
const usersValidationRule = require('../../../../helpers/validation/rules/users')
const requestValidationMiddleware = require('../../../../middleware/requestValidation')
const multerMiddleware = require('../../../../middleware/multer')

profileRoute.get(
    '/',
    jwtMiddleware,
    profileController.profileInfo
)

profileRoute.put(
    '/edit',
    jwtMiddleware,
    usersValidationRule.editProfile,
    requestValidationMiddleware,
    profileController.updateProfile
)

profileRoute.put(
    '/upload',
    jwtMiddleware,
    multerMiddleware,
    profileController.updateImage
)

profileRoute.post(
    '/delete',
    jwtMiddleware,
    profileController.deleteImage
)

module.exports = profileRoute