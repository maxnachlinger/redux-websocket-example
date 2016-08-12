const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')

module.exports = {
  context: path.join(__dirname, '/../'),
  entry: {
    app: './src/index.js',
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: '../server/public',
    publicPath: '/',
    filename: 'app.min-[hash:6].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.min-[hash:6].js',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: 'React/Redux Websocket Example',
      favicon: path.join(__dirname, '/favicon.ico'),
      template: path.join(__dirname, '/index.html.ejs'),
      inject: true,
      appMountId: 'root',
      mobile: true,
      minify: {
        collapseWhitespace: true
      }
    })
  ],
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
