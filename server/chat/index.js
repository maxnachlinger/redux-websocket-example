const uuid = require('node-uuid')
const config = require('../../common/config')
const logger = require('./../logger')
const { messageTypes } = config

function sendChatMessage (io, user, message) {
  return io.sockets.emit(messageTypes.messageAdded, {
    id: uuid.v4(),
    createdAt: Date.now(),
    message,
    user
  })
}

function sendSystemMessage (io, message) {
  return io.sockets.emit(messageTypes.messageAdded, {
    id: uuid.v4(),
    createdAt: Date.now(),
    message
  })
}

function onUsersRequested (io, socket, data) {
  const event = messageTypes.usersRequested
  logger.info({ event })
  const sockets = io.sockets.sockets || {}

  // only pull back sockets for joined users
  const users = Object.keys(sockets || {})
    .filter((key) => sockets[ key ].user)
    .map((key) => sockets[ key ].user)

  return socket.emit(event, users)
}

function onJoinRequested (io, socket, data) {
  const user = { id: uuid.v4(), name: data.name }

  addUser(io, socket, user)
  return sendSystemMessage(io, `${user.name} joined`)
}

function addUser (io, socket, user) {
  logger.info({ user }, 'Adding user')

  socket.user = user // middleware adds this for subsequent messages
  socket.request.session.user = user
  socket.request.session.save() // we have to do this explicitly

  socket.emit(messageTypes.joinRequested, user)
  return socket.broadcast.emit(messageTypes.userJoined, user)
}

function onMessageAdded (io, socket, data) {
  const event = messageTypes.messageAdded
  const user = socket.user

  logger.info({ data, event, user })
  return sendChatMessage(io, user, data.message)
}

function onTypingStarted (io, socket, data) {
  const event = messageTypes.userStartedTyping
  const user = socket.user

  logger.info({ event, user })
  return socket.broadcast.emit(event, { userId: user.id })
}

function onTypingStopped (io, socket, data) {
  const event = messageTypes.userStoppedTyping
  const user = socket.user

  logger.info({ event, user })
  return socket.broadcast.emit(event, { userId: user.id })
}

// userId -> timerId, for clearing pending userLeft messages on refresh (which is a quick disconnect / reconnect)
const disconnectedUsers = {}

function onDisconnect (io, socket) {
  const user = socket.user
  if (!user) {
    return
  }

  // this disconnect might be a refresh, give it a moment to make sure the user isn't coming back
  disconnectedUsers[ user.id ] = setTimeout(() => {
    delete disconnectedUsers[ user.id ]
    logger.info({ event: messageTypes.userLeft, user })
    io.sockets.emit(messageTypes.userLeft, { userId: user.id })
    return sendSystemMessage(io, `${user.name} left`)
  }, 2000)
}

function handleReconnect (io, socket, user) {
  const timeoutId = disconnectedUsers[ user.id ]

  if (timeoutId) {
    clearTimeout(timeoutId)
    logger.info({ user }, 'User refreshed')
    return socket.emit(messageTypes.joinRequested, user)
  }

  addUser(io, socket, user)
}

function addListenersToSocket (io, socket) {
  const user = socket.user
  if (user) {
    handleReconnect(io, socket, user)
  }

  socket.on(messageTypes.usersRequested, (data) => onUsersRequested(io, socket, data))
  socket.on(messageTypes.joinRequested, (data) => onJoinRequested(io, socket, data))
  socket.on(messageTypes.messageAdded, (data) => onMessageAdded(io, socket, data))
  socket.on(messageTypes.userStartedTyping, (data) => onTypingStarted(io, socket, data))
  socket.on(messageTypes.userStoppedTyping, (data) => onTypingStopped(io, socket, data))
  socket.on('disconnect', () => onDisconnect(io, socket))
}

module.exports.init = (io) => {
  io.on('connection', (socket) => addListenersToSocket(io, socket))
}
