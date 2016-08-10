const bunyan = require('bunyan')
const packageJson = require('./package.json')

const { name, version } = packageJson

module.exports = bunyan.createLogger({
  name,
  version,
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'warn',
      stream: process.stderr
    }
  ]
})
