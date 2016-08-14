const port = 3000
const host = '127.0.0.1'

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
  'userJoined',
  'userLeft',
  'joinRequested',
  'usersRequested',
  'userStartedTyping',
  'userStoppedTyping',
  'messageAdded'
].reduce((accum, msg) => {
  accum[ msg ] = msg
  return accum
}, {})

module.exports = {
  port,
  host,
  messageTypes,
  uri: `http://${host}:${port}`
}
