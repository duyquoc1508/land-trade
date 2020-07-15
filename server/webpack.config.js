const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  target: "node",
  externals: [nodeExternals()],
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "10.16.3"
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [new Dotenv()]
};
