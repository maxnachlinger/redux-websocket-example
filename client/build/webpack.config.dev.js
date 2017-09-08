const webpack = require('webpack')
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const configBase = require('./webpack.config.base')

const plugins = [
  new BellOnBundlerErrorPlugin(), // beeps on compile errors
  // let react know not to optimize / ignore debugging info/errors
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify('true'),
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
].concat(configBase.plugins)

module.exports = Object.assign({}, configBase, {
  devtool: 'source-map' // source-maps let us do cool things like add breakpoints in our code
}, { plugins })
