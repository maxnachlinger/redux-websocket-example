const configBase = require('./webpack.config.base')

// source-maps let us do cool things like add breakpoints in our code
module.exports = Object.assign({}, configBase, {
  devtool: 'source-map',
  debug: true
})
