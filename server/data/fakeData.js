const users = [ {
  nick: 'bot',
  online: true
} ]

const messages = [ {
  nick: 'bot',
  createdAt: new Date(),
  message: 'Hello, I am a bot.'
} ]

module.exports = {
  addUser: (nick) => users.push({ nick, online: true }),
  getUsers: () => users.concat(),
  getMessages: () => messages.concat(),
  toggleUserOffline: (nick) => {
    users.forEach((user, idx) => {
      users[ idx ].online = !user.online
    })
  },
  addMessage: (nick, message) => messages.push({ nick, message, createdAt: new Date() }),
}
