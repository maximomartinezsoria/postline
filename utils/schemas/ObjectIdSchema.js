const joi = require('@hapi/joi')

const ObjectIdSchema = joi.string().regex(new RegExp(/^\w{24}$/))

module.exports = ObjectIdSchema
