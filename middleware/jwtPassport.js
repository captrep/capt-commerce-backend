const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { User} = require('../database/models');
const ApiErrorHandler = require('../helpers/ApiErrorHandler')
const userTransformer = require('../helpers/transformer/user')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PRIVATE_KEY
}
passport.use(
    new Strategy(opts, (res, done) => {
        return User.findByPk(res.id)
        .then(user => {
            return done(null, user)
        })
        
    })
)

const jwt = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function (err, user) {
        if (err) { throw new ApiErrorHandler(401, "unauthorized") } 
        if (!user) { throw new ApiErrorHandler(401, "unauthorized") }
        req.user = user
        next()
    })(req, res, next)
}

module.exports = jwt