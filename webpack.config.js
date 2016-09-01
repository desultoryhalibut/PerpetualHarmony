const webpack = require('webpack');
const path = require('path');


const config = {
  context: path.join(__dirname, 'client/app'),
  entry: [
    './index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};

module.exports = config;
