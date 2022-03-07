const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  output: {
    filename: "index.bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|esm)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
  ],
};
