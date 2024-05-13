const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
//   resolve: {
//     fallback: {
//       "stream": false,
//       "path": false,
//       "util": false,
//       "http": false,
//       "assert": false,
//       "crypto": false,
//       "querystring": false,
//       "os": false,
//       "zlib": false,
//       "https": false
//     }
//   }
};

