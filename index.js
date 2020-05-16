const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')

const routes = require('./routes')

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middlewares/errorHandlers')

const notFoundHandler = require('./utils/middlewares/notFound')

const app = express()

// Middlewares
app.use(bodyParser.json())

routes(app)

app.use(notFoundHandler)

// Errors middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

// Server
const server = app.listen(config.port, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})
