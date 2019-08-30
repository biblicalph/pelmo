const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');
const CLIENT_DIR = path.join(SRC_DIR, 'client');
const { NODE_ENV, PORT } = process.env;
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

module.exports = {
  entry: ['@babel/polyfill', path.join(CLIENT_DIR, 'app/index.js')],
  output: {
    filename: 'build.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      App: path.join(CLIENT_DIR, 'app'),
      Assets: path.join(CLIENT_DIR, 'public')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [
    // remove unused files from /dist folder
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.API_URL': JSON.stringify(API_URL)
    }),
    new HtmlWebpackPlugin({
      template: path.join(CLIENT_DIR, 'public/index.html')
    }),
    new CopyPlugin([
      {
        from: path.join(CLIENT_DIR, 'public/font'),
        to: 'font'
      },
      {
        from: path.join(CLIENT_DIR, 'public/weather-icons.min.css')
      }
    ])
  ]
}