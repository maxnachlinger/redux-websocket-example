const config = require('../../common/config')

module.exports = (socket) => {
  socket.on(config.messages.messages, () => {
    socket.emit(config.messages.messages, []) // TODO - get some messages :)
  })
}
