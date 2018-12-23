const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = () => {
  const stats = {
    all: false, // "undefined" value set all settings to their default behaviour
    errors: true,
    errorDetails: true,
    warnings: true,
    assets: true
  };

  return {
    entry: {main: './client/app.js'},
    output: {
      path: path.join(__dirname, 'client', 'public', 'dist'),
      filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {loader: "babel-loader"}
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(path.join(__dirname, 'client', 'public', 'dist'), {}),
      new MiniCssExtractPlugin({filename: 'styles.[contenthash].css'}),
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: path.join(__dirname, 'client', 'public', 'app.html'),
        filename: path.join(__dirname, 'client', 'public', 'dist', 'app.html')
      })
    ],
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
    devServer: {
      port: 3000,
      contentBase: path.join(__dirname, 'client', 'public'),
      historyApiFallback: {index: '/dist/app.html'},
      publicPath: '/dist/',
      stats
    },
    mode: process.env.NODE_ENV,
    stats,
  };
};
