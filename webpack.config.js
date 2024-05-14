const path = require('path');

module.exports = {
  mode: 'production', // development or production
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'node',
};

