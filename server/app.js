const {createServer} = require('http')
const {ensureDir} = require('fs-extra')
const _ = require('lodash')
const express = require('express')
const socketIo = require('socket.io')
const helmet = require('helmet')
const session = require('express-session')
const LevelStore = require('level-session-store')(session)
const config = require('./config')
const {host, port} = require('../common/config')
const logger = require('./logger')
const chat = require('./chat')

const setup = () => {
  const env = process.env.NODE_ENV || 'development'
  const app = express()
  const server = createServer(app)

  const io = socketIo(server, {})
  chat.init(io)

  app.use(helmet())
  const sessionMiddleware = session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: env !== 'development'},
    // for larger, distributed, APIs use redis or something else instead
    store: new LevelStore(config.sessionStorePath)
  })
  app.use(sessionMiddleware)

  // copies express sessions to socket-io
  io.use((socket, next) => sessionMiddleware(socket.request, socket.request.res, next))

  // saves having to type "socket.request.session.user" everywhere
  io.use((socket, next) => {
    const user = _.get(socket, 'request.session.user')
    if (user) {
      socket.user = user
    }
    return next()
  })

  // for serving the client
  app.use(express.static('public'))

  app.use((err, req, res, next) => {
    logger.error({err})

    if (!res.headersSent) {
      res.status(500).send()
    }
  })

  return new Promise((resolve, reject) => {
    return server.listen(port, host, (err) => {
      if (err) {
        return reject(err)
      }
      logger.info(`Server listening on ${host}:${port}`)
      return resolve(server)
    })
  })
}

const onError = (err) => {
  logger.error(err)
  process.exit(1)
}

ensureDir(config.sessionStorePath)
  .then(setup)
  .catch(onError)

process.on('uncaughtException', onError)
