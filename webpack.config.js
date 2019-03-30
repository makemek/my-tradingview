const path = require('path')
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require('webpack')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  mode: env,
  entry: './src',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader'
          }
      ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProgressPlugin(),
    // clean the build folder
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    new CopyWebpackPlugin([{
      from: "manifest.json",
      transform: function (content, path) {
        // generates the manifest file using the package.json informations
        return Buffer.from(JSON.stringify({
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString())
        }))
      }
    }], { copyUnmodified: true }),
  ]
};
