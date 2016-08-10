const path = require('path')

module.exports = {
  context: path.join(__dirname, '/../'),
  entry: [
    './src/index.js'
  ],
  output: {
    path: '../server/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: [ /\.js$/ ],
        exclude: /node_modules/,
        include: path.resolve('.'),
        loader: 'babel',
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
