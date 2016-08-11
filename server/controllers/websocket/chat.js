const config = require('../../../common/config')
const { messageTypes } = config

function getMessages (socket) {
  socket.emit(messageTypes.getMessages, []) // TODO - get some messages :)
}
function getUsers (socket) {
  socket.emit(messageTypes.getUsers, []) // TODO - get some users :)
}

module.exports.attachListeners = (socket) => {
  socket.on(messageTypes.getMessages, (data) => getMessages(socket))
  socket.on(messageTypes.getUsers, (data) => getUsers(socket))
}
