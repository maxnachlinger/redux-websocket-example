const uuid = require('node-uuid')
const config = require('../common/config')
const chatBot = require('./chatBot')
const { messageTypes } = config

function onUsersRequested (event, io, socket) {
  const sockets = io.sockets.sockets || {}

  // only pull back sockets for joined users
  const users = Object.keys(sockets || {})
    .filter((key) => sockets[ key ].user)
    .map((key) => sockets[ key ].user)
    .concat([ chatBot.user ]) // add our chatbot

  socket.emit(event, users)
}

function onJoinRequested (event, socket, data) {
  socket.user = { id: uuid.v4(), name: data.name }
  socket.emit(event, data)
  socket.broadcast.emit(messageTypes.userJoined, data)
}

function onDisconnect (socket) {
  if (!socket.user) {
    return
  }
  socket.broadcast.emit(messageTypes.userLeft, socket.user);
}

function addListenersToSocket (io, socket) {
  socket.on(messageTypes.usersRequested, (data) => onUsersRequested(messageTypes.usersRequested, io, socket))
  socket.on(messageTypes.joinRequested, (data) => onJoinRequested(messageTypes.joinRequested, socket, data))
  socket.on('disconnect', () => onDisconnect(socket))
}

module.exports.init = (io) => {
  io.on('connection', (socket) => addListenersToSocket(io, socket))
}
