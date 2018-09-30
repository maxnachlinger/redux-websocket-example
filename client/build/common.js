const path = require("path");

const outputPath = path.join(__dirname, "/../../server/public");
const assetsFilename = "assets.json";

module.exports = {
  publicPath: "",
  srcPath: path.join(__dirname, "/../src"),
  devJsBundleName: "bundle.js",
  devCssBundleName: "bundle.css",
  outputPath,
  assetsFilename,
  assetsJsonFullOutputPath: path.join(outputPath, assetsFilename),
  devServerHost: "127.0.0.1",
  devServerPort: 2999,
};
