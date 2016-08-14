const uuid = require('node-uuid')
const config = require('../common/config')
const logger = require('./logger')
const chatBot = require('./chatBot')
const { messageTypes } = config

function sendChatMessage (io, username, message) {
  return io.sockets.emit(messageTypes.messageAdded, {
    username,
    message,
    id: uuid.v4(),
    createdAt: Date.now()
  })
}

function onUsersRequested (event, io, socket, data) {
  logger.info({event})
  const sockets = io.sockets.sockets || {}

  // only pull back sockets for joined users
  const users = Object.keys(sockets || {})
    .filter((key) => sockets[ key ].user)
    .map((key) => sockets[ key ].user)
    .concat([ chatBot.user ]) // add our chatbot

  return socket.emit(event, users)
}

function onJoinRequested (event, io, socket, data) {
  logger.info({data, event})
  const user = { id: uuid.v4(), name: data.name }
  socket.user = user

  socket.emit(event, user)
  logger.info(messageTypes.usersRequested)
  io.sockets.emit(messageTypes.userJoined, user)

  return sendChatMessage(io, chatBot.user.name, chatBot.welcomeUser(data))
}

function onMessageAdded (event, io, socket, data) {
  logger.info({data, event, user: socket.user})
  return sendChatMessage(io, socket.user.name, data.message)
}

function onTypingStarted(event, io, socket, data) {
  logger.info({event, user: socket.user})
  return socket.broadcast.emit(event, {userId: socket.user.id})
}

function onTypingStopped(event, io, socket, data) {
  logger.info({event, user: socket.user})
  return socket.broadcast.emit(event, {userId: socket.user.id})
}

function onDisconnect (event, io, socket) {
  logger.info({event, user: socket.user})
  if (!socket.user) {
    return
  }
  return io.sockets.emit(event, socket.user);
}

function addListenersToSocket (io, socket) {
  socket.on(messageTypes.usersRequested, (data) => onUsersRequested(messageTypes.usersRequested, io, socket, data))
  socket.on(messageTypes.joinRequested, (data) => onJoinRequested(messageTypes.joinRequested, io, socket, data))
  socket.on(messageTypes.messageAdded, (data) => onMessageAdded(messageTypes.messageAdded, io, socket, data))
  socket.on(messageTypes.userStartedTyping, (data) => onTypingStarted(messageTypes.userStartedTyping, io, socket, data))
  socket.on(messageTypes.userStoppedTyping, (data) => onTypingStopped(messageTypes.userStoppedTyping, io, socket, data))
  socket.on('disconnect', () => onDisconnect(messageTypes.userLeft, io, socket))
}

module.exports.init = (io) => {
  io.on('connection', (socket) => addListenersToSocket(io, socket))
}
