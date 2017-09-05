const pino = require('pino')()
const packageJson = require('./package.json')

const {name, version} = packageJson

module.exports = pino.child({app: {name, version}})
