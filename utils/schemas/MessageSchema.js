const joi = require('@hapi/joi')
const objectIdSchema = require('./ObjectIdSchema')

const MessageSchema = joi.object({
  text: joi.string(),
  emitter: objectIdSchema,
  receptor: objectIdSchema,
})

module.exports = MessageSchema
