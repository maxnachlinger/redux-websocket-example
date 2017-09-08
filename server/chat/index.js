const uuid = require('uuid')
const config = require('../../common/config')
const logger = require('../logger')
const {messageTypes} = config

const {
  joinRequested,
  messageAdded,
  userJoined,
  userLeft,
  usersRequested,
  userStartedTyping,
  userStoppedTyping
} = messageTypes

const sendSystemMessage = ({io, message}) => io.sockets.emit(messageAdded, {
  id: uuid.v4(),
  createdAt: Date.now(),
  message
})

const onUsersRequested = ({io, socket}) => {
  const event = usersRequested
  logger.info({event})
  const sockets = io.sockets.sockets || {}

  // only pull back sockets for joined users
  const users = Object.keys(sockets)
    .filter((key) => sockets[key].user)
    .map((key) => sockets[key].user)

  return socket.emit(event, users)
}

const onJoinRequested = ({io, socket, data}) => {
  const user = {id: uuid.v4(), name: data.name}

  addUser({socket, user})
  return sendSystemMessage({io, message: `${user.name} joined`})
}

const addUser = ({socket, user}) => {
  logger.info({user}, 'Adding user')

  socket.user = user // middleware adds this for subsequent messages
  socket.request.session.user = user
  socket.request.session.save() // we have to do this explicitly

  socket.emit(joinRequested, user)
  return socket.broadcast.emit(userJoined, user)
}

const onMessageAdded = ({io, socket, data}) => {
  const event = messageAdded
  const {user} = socket
  const {message} = data

  logger.info({data, event, user})
  return io.sockets.emit(messageAdded, {
    id: uuid.v4(),
    createdAt: Date.now(),
    message,
    user
  })
}

const onTypingStarted = ({socket}) => {
  const event = userStartedTyping
  const user = socket.user

  logger.info({event, user})
  return socket.broadcast.emit(event, {userId: user.id})
}

const onTypingStopped = ({socket}) => {
  const event = userStoppedTyping
  const user = socket.user

  logger.info({event, user})
  return socket.broadcast.emit(event, {userId: user.id})
}

// userId -> timerId, for clearing pending userLeft messages on refresh (which is a quick disconnect / reconnect)
const disconnectedUsers = {}

const onDisconnect = ({io, socket}) => {
  const user = socket.user
  if (!user) {
    return
  }

  // this disconnect might be a refresh, give it a moment to make sure the user isn't coming back
  disconnectedUsers[user.id] = setTimeout(() => {
    delete disconnectedUsers[user.id]
    logger.info({event: userLeft, user})
    io.sockets.emit(userLeft, {userId: user.id})
    return sendSystemMessage({io, message: `${user.name} left`})
  }, 2000)
}

const handleReconnect = ({socket, user}) => {
  const timeoutId = disconnectedUsers[user.id]

  if (timeoutId) {
    clearTimeout(timeoutId)
    logger.info({user}, 'User refreshed')
    return socket.emit(joinRequested, user)
  }

  return addUser({socket, user})
}

const addListenersToSocket = ({io, socket}) => {
  const user = socket.user
  if (user) {
    handleReconnect({socket, user})
  }

  socket.on(usersRequested, (data) => onUsersRequested({io, socket}))
  socket.on(joinRequested, (data) => onJoinRequested({io, socket, data}))
  socket.on(messageAdded, (data) => onMessageAdded({io, socket, data}))
  socket.on(userStartedTyping, (data) => onTypingStarted({io, socket}))
  socket.on(userStoppedTyping, (data) => onTypingStopped({io, socket}))
  socket.on('disconnect', () => onDisconnect({io, socket}))
}

module.exports.init = (io) => {
  io.on('connection', (socket) => addListenersToSocket({io, socket}))
}
