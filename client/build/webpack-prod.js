const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-ignore-next-line
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const { srcPath, publicPath, outputPath, assetsFilename } = require("./common");

module.exports = {
  context: srcPath,
  entry: {
    app: `${srcPath}/index.jsx`,
  },
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    path: outputPath,
    chunkFilename: "[name].[contenthash].js",
    publicPath,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
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
    new CleanWebpackPlugin(outputPath, { allowExternal: true }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin(),
    new CompressionPlugin(),
    new AssetsPlugin({
      filename: assetsFilename,
      path: outputPath,
      prettyPrint: true,
    }),
    new HtmlWebpackPlugin({
      title: "Preact / Redux Websocket Test",
    }),
    // un-comment to help with shrinking bundle size
    // new BundleAnalyzerPlugin(),
  ],
};
