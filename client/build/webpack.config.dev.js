const path = require('path')
// const webpack = require('webpack')

module.exports = {
  entry: [
    path.join(__dirname, '../src/index.js')
  ],
  output: {
    path: path.join(__dirname, '../../server/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: [ /\.js$/ ],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015', 'stage-0' ]
        }
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  }
}
