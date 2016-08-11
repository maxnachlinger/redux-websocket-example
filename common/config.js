const port = 3000
const host = '127.0.0.1'

const messageTypes = [
  'getMessages',
  'getUsers'
].reduce((accum, msg) => {
  accum[msg] = msg
  return accum
}, {})

module.exports = {
  port,
  host,
  messageTypes,
  uri: `http://${host}:${port}`
}
