const uuid = require('node-uuid')
const config = require('../common/config')
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

function onUsersRequested (event, io, socket) {
  const sockets = io.sockets.sockets || {}

  // only pull back sockets for joined users
  const users = Object.keys(sockets || {})
    .filter((key) => sockets[ key ].user)
    .map((key) => sockets[ key ].user)
    .concat([ chatBot.user ]) // add our chatbot

  return socket.emit(event, users)
}

function onJoinRequested (event, io, socket, data) {
  const user = { id: uuid.v4(), name: data.name }
  socket.user = user

  socket.emit(event, user)
  io.sockets.emit(messageTypes.userJoined, user)

  return sendChatMessage(io, chatBot.user.name, 'Welcome, ' + data.name)
}

function onMessageAdded (event, io, socket, data) {
  return sendChatMessage(io, socket.user.name, data.message)
}

function onDisconnect (io, socket) {
  if (!socket.user) {
    return
  }
  return io.sockets.emit(messageTypes.userLeft, socket.user);
}

function addListenersToSocket (io, socket) {
  socket.on(messageTypes.usersRequested, () => onUsersRequested(messageTypes.usersRequested, io, socket))
  socket.on(messageTypes.joinRequested, (data) => onJoinRequested(messageTypes.joinRequested, io, socket, data))
  socket.on(messageTypes.messageAdded, (data) => onMessageAdded(messageTypes.messageAdded, io, socket, data))
  socket.on('disconnect', () => onDisconnect(io, socket))
}

module.exports.init = (io) => {
  io.on('connection', (socket) => addListenersToSocket(io, socket))
}
