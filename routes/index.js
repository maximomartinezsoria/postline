const express = require('express')

const messagesRoutes = require('./messages')
const authRoutes = require('./auth')
const postsRoutes = require('./posts')

function routes(app) {
  const router = express.Router()

  authRoutes(app, router)
  app.use(router)

  postsRoutes(app)
  messagesRoutes(app)
}

module.exports = routes
