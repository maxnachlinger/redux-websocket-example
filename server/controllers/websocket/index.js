const controllers = [
  require('./chat')
]

module.exports.init = (socket) => controllers.forEach(c => c.attachListeners(socket))
