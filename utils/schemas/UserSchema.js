const joi = require('@hapi/joi')

const UserSchema = joi.object({
  name: joi.string().max(255),
  username: joi.string().max(255),
  email: joi.email().required(),
  photo: joi.string().max(255),
  password: joi.string().required().max(255),
})

module.exports = UserSchema
