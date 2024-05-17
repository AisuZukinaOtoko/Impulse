const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // development or production
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/homepage/template.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    
  target: 'node',
};

