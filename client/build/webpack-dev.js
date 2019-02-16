const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const {
  srcPath,
  outputPath,
  publicPath,
  assetsFilename,
  devCssBundleName,
  devJsBundleName,
} = require("./common");

module.exports = {
  context: srcPath,
  entry: {
    app: `${srcPath}/index.jsx`,
  },
  mode: "development",
  watch: true,
  output: {
    path: outputPath,
    publicPath,
    filename: devJsBundleName,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
      {
        test: /\.(styl|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
      "create-react-class": "preact-compat/lib/create-react-class",
    },
  },
  plugins: [
    new CleanWebpackPlugin(outputPath, {
      allowExternal: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new MiniCssExtractPlugin({
      filename: devCssBundleName,
    }),
    new AssetsPlugin({
      filename: assetsFilename,
      path: outputPath,
      prettyPrint: true,
    }),
    new HtmlWebpackPlugin({
      title: "Preact / Redux Websocket Test",
    }),
  ],
};
