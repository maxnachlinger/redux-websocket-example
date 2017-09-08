const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')

const srcDir = path.join(__dirname, '/../src')
const outputDir = path.join(__dirname, '/../../server/public')

module.exports = {
  // root directory used to resolve paths
  context: srcDir,
  // Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks.
  recordsPath: path.join(outputDir, '/manifests/records.json'),
  entry: {
    app: './index.js',
    // everything that's in dependencies (not a devDependencies) in our package.json file will be bundled into vendor.js
    vendor: Object.keys(pkg.dependencies)
  },
  // we'll output everything to /server/public
  output: {
    path: outputDir,
    filename: 'app.min-[hash:6].js' // the [hash:6] bit here helps us control browser caching
  },
  plugins: [
    // don't emit assets with errors
    new webpack.NoEmitOnErrorsPlugin(),
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
          srcDir,
          path.join(srcDir, '/../../common/')
        ],
        loader: 'babel-loader',
        query: {
          // fix per https://github.com/babel/babel-loader/issues/166#issuecomment-160866946
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-0')
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.json', '.js', '.jsx' ]
  }
}
