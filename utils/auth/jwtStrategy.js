const passport = require('passport')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')
const config = require('../../config')
const UserService = require('../../services/User')

passport.use(
  new JWTStrategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (JWTPayload, done) => {
      const User = new UserService()

      try {
        const [user] = await User.get({ email: JWTPayload.email })

        if (!user) done(boom.unauthorized(), false)

        done(null, user)
      } catch (error) {
        done(error)
      }
    },
  ),
)
