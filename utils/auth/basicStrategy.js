const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UserService = require('../../services/User')

passport.use(
  new BasicStrategy(async (username, password, cb) => {
    const User = new UserService()

    try {
      const user = await User.findOne({
        $or: [
          { email: username },
          { username },
        ],
      })

      if (!user) return cb(boom.unauthorized(), false)

      if (!(await bcrypt.compare(password, user.password))) { return cb(boom.unauthorized(), false) }

      delete user.password

      return cb(null, user)
    } catch (error) {
      return cb(error)
    }
  }),
)
