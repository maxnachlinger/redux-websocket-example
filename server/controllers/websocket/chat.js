const config = require('../../../common/config')
const fakeData = require('../../data/fakeData')
const { messageTypes } = config

function getMessages (socket) {
  socket.emit(messageTypes.getMessages, fakeData.getMessages())
}
function getUsers (socket) {
  socket.emit(messageTypes.getUsers, fakeData.getUsers())
}

module.exports.attachListeners = (socket) => {
  socket.on(messageTypes.getMessages, (data) => getMessages(socket))
  socket.on(messageTypes.getUsers, (data) => getUsers(socket))
}
