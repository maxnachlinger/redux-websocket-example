'use strict'
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
//const socketEvents = require('./socketEvents')
const logger = require('./logger')

const port = 3000
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {})
//socketEvents(io)

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

server.listen(port, (err) => {
  if (err) {
    return onError(err)
  }
  logger.info(`Server listening on port: ${port}`)
})

process.on('uncaughtException', onError)
