const joi = require('@hapi/joi')
const objectIdSchema = require('./ObjectIdSchema')

const PostSchema = joi.object({
  text: joi.string().required().max(255),
  user_id: objectIdSchema,
})

module.exports = PostSchema
