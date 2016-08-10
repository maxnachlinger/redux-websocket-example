const config = require('../../common/config')
const {messageTypes} = config

module.exports = (socket) => {
  socket.on(messageTypes.getMessages, () => {
    socket.emit(messageTypes.getMessages, []) // TODO - get some messages :)
  })
}
