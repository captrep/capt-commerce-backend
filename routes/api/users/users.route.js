const usersRoute = require('express').Router()

usersRoute.use('/auth', require('./auth/auth.route'))
usersRoute.use('/profile', require('./profile/profile.route'))
usersRoute.use('/settings', require('./settings/settings.route'))
module.exports = usersRoute
