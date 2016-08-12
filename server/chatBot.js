const uuid = require('node-uuid')

module.exports.user = {
  id: uuid.v4(),
  name: 'chat-bot'
}

module.exports.welcomeUser = (user) => 'Welcome, ' + user.name
