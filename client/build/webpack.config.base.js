const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const pkg = require('../package.json')

module.exports = {
  // root directory used to resolve paths
  context: path.join(__dirname, '/../'),
  entry: {
    app: './src/index.js',
    // everything that's in dependencies (not a devDependencies) in our package.json file will be bundled into vendor.js
    vendor: Object.keys(pkg.dependencies)
  },
  // we'll output everything to /server/public
  output: {
    path: '../server/public',
    publicPath: '/',
    filename: 'app.min-[hash:6].js' // the [hash:6] bit here helps us control browser caching
  },
  plugins: [
    // don't emit assets with errors
    new webpack.NoErrorsPlugin(),
    // makes various favicons and injects the html for them
    new FaviconsWebpackPlugin(path.join(__dirname, '/logo.png')),
    // creates a vendor.js file will all our external dependencies - this can be aggressively cached
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.min-[hash:6].js',
      minChunks: Infinity
    }),
    // writes out our index.html
    new HtmlWebpackPlugin({
      title: 'React/Redux Websocket Example',
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
      // transforms es2015 and jsx into es5
      {
        test: [ /\.js$/ ],
        exclude: /node_modules/,
        include: [
          path.resolve('.')
        ],
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
