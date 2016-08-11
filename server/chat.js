const config = require('../common/config')
const chatBot = require('./chatBot')
const { messageTypes } = config

function getUsers (event, io, socket) {
  const sockets = io.sockets.sockets || {}

  // only pull back sockets with nick's
  const users = Object.keys(sockets || {})
    .filter((key) => sockets[ key ].nick)
    .map((key) => { return { nick: socket[ key ].nick }})
    .concat([ { nick: chatBot.nick() } ]) // add our chatbot

  socket.emit(event, users)
}

function addListenersToSocket (io, socket) {
  socket.on(messageTypes.usersRequested, (data) => getUsers(messageTypes.usersRequested, io, socket))
}

module.exports.init = (io) => {
  io.on('connection', (socket) => addListenersToSocket(io, socket))
}
