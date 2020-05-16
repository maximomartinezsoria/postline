const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const config = require('../config')
const UserService = require('../services/User')

require('../utils/auth/basicStrategy')

function authRoutes(app, router) {
  app.use('/api', router)

  const User = new UserService()

  router.post('/register', async (req, res, next) => {
    try {
      const userId = await User.create(req.body)
      res.status(201).json(userId)
    } catch (error) {
      next(error)
    }
  })

  router.post('/login', async (req, res, next) => {
    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) return next(boom.unauthorized())

        req.login(user, { session: false }, async (loginError) => {
          if (loginError) return next(loginError)

          const { _id: id, name, email } = user

          const payload = {
            id,
            name,
            email,
          }

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          })

          res.status(200).json({ token, user: { id, email, name } })
        })
      } catch (err) {
        next(err)
      }
    })(req, res, next)
  })
}

module.exports = authRoutes
