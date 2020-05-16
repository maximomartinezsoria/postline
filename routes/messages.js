const passport = require('passport')
const express = require('express')
const MessageService = require('../services/Message')
const validationHandler = require('../utils/middlewares/validationHandler')
const messageSchema = require('../utils/schemas/MessageSchema')

require('../utils/auth/jwtStrategy')

function messagesRoutes(app) {
  const router = express.Router()

  app.use('/api/messages', router)

  const Message = new MessageService()

  router.get('/:emitter/:receptor?',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { emitter, receptor } = req.query
      let queryArgs = { emitter }
      if (receptor) queryArgs = { $and: [{ emitter }, { receptor }] }

      const messages = await Message.get(queryArgs)
      res.status(200).json(messages)
    })

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(messageSchema),
    async (req, res) => {
      const messageId = await Message.create(req.body)
      res.status(201).json(messageId)
    })
}

module.exports = messagesRoutes
