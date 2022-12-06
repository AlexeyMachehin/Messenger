const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const PugPlugin = require("pug-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const pages = [
  "/change-data",
  "/login",
  "/sign-up",
  "/change-password",
  "/error404",
  "/error500",
  "/settings",
  "/messenger",
  "/",
];

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    port: 3000,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    fallback: {
      fs: false,
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./style.scss",
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./src/static/index.html"),
      filename: "./index.html",
      inject: true,
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new PugPlugin({
      pretty: true,
      extractCss: {
        filename: "assets/css/[name].[contenthash:8].css",
      },
    }),
    new CopyPlugin({
      patterns: ["./src/static/pug.js", "./src/static/pug-init.js"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            issuer: /\.(ts)$/,
            loader: PugPlugin.loader,
            options: {
              method: "compile",
            },
          },
          {
            loader: PugPlugin.loader,
          },
        ],
      },
    ],
  },
};
