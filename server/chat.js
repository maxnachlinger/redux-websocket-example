const config = require('../common/config')
const chatBot = require('./chatBot')
const { messageTypes } = config

function onUsersRequested (event, io, socket) {
  const sockets = io.sockets.sockets || {}

  // only pull back sockets with nick's
  const users = Object.keys(sockets || {})
    .filter((key) => sockets[ key ].nick)
    .map((key) => { return { nick: sockets[ key ].nick }})
    .concat([ { nick: chatBot.nick() } ]) // add our chatbot

  socket.emit(event, users)
}

function onJoinRequested (event, socket, data) {
  socket.nick = data.nick
  socket.emit(event, data)
  socket.broadcast.emit(messageTypes.userJoined, data)
}

function onDisconnect (socket) {
  if (!socket.nick) {
    return
  }
  socket.broadcast.emit(messageTypes.userLeft, {
    nick: socket.nick
  });
}

function addListenersToSocket (io, socket) {
  socket.on(messageTypes.usersRequested, (data) => onUsersRequested(messageTypes.usersRequested, io, socket))
  socket.on(messageTypes.joinRequested, (data) => onJoinRequested(messageTypes.joinRequested, socket, data))
  socket.on('disconnect', () => onDisconnect(socket))
}

module.exports.init = (io) => {
  io.on('connection', (socket) => addListenersToSocket(io, socket))
}
