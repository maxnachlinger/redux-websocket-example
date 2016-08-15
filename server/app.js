const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const helmet = require('helmet')
const session = require('express-session')
const LevelStore = require('level-session-store')(session)
const config = require('./config')
const { host, port } = require('../common/config')
const logger = require('./logger')
const chat = require('./chat')

const env = process.env.NODE_ENV || 'development'
const app = express()
const server = http.createServer(app)

const io = socketIo(server, {})
chat.init(io)

app.use(helmet())
const sessionMiddleware = session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: env !== 'development' },
  store: new LevelStore(config.sessionStorePath) // for larger, distributed, APIs use redis or something else instead
})
app.use(sessionMiddleware)

// copies express sessions to socket-io
io.use((socket, next) => sessionMiddleware(socket.request, socket.request.res, next))
// saves having to type "socket.request.session.user" everywhere
io.use((socket, next) => {
  if (socket.request.session.user) {
    socket.user = Object.assign({}, socket.request.session.user)
  }
  return next()
})

app.use(express.static('public')) // for serving the client

app.use((err, req, res, next) => {
  logger.error({ err })

  if (!res.headersSent) {
    res.status(500).send()
  }
})

function onError (err) {
  logger.error(err)
  process.exit(1)
}

server.listen(port, host, (err) => {
  if (err) {
    return onError(err)
  }
  logger.info(`Server listening on ${host}:${port}`)
})

process.on('uncaughtException', onError)
