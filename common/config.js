const port = 3000
const host = '127.0.0.1'

const messages = [
  'messages'
].reduce((accum, msg) => {
  accum[msg] = msg
  return accum
}, {})

const config = {
  port,
  host,
  messages,
  uri: `http://${host}:${port}`
}

module.exports = config
