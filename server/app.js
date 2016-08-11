const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const config = require('../common/config')
const logger = require('./logger')
const controller = require('./controllers')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {})
io.on('connection', controller.init)

app.use(express.static('public')) // for serving the client

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  logger.error({ err })
  res.status(500).send()
})

function onError (err) {
  logger.error({ err })
  process.exit(1)
}

server.listen(config.port, (err) => {
  if (err) {
    return onError(err)
  }
  logger.info(`Server listening on port: ${config.port}`)
})

process.on('uncaughtException', onError)
