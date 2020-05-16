const boom = require('@hapi/boom')

function validationHandler(schema, check = 'body') {
  return (req, res, next) => {
    const { error } = schema.validate(req[check])

    if (error) next(boom.badRequest(error))
    next()
  }
}

module.exports = validationHandler
