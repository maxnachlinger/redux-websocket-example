const webpack = require('webpack')
const configBase = require('./webpack.config.base')

const plugins = [
  // let react know to ignore debugging info
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify('false'),
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
].concat(configBase.plugins)

module.exports = Object.assign({}, configBase, { plugins })
