const configBase = require('./webpack.config.base')

module.exports = Object.assign({}, configBase, {
  devtool: 'source-map',
  debug: true
})
