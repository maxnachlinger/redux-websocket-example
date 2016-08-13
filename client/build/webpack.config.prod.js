const webpack = require('webpack')
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const configBase = require('./webpack.config.base')

const plugins = [
  new BellOnBundlerErrorPlugin(), // beeps on compile errors
  // let react know to ignore debugging info
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify('false'),
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
].concat(configBase.plugins)

module.exports = Object.assign({}, configBase, {
  plugins
})
