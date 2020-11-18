const path = require('path');

module.exports = {
  mode: 'development',
  entry: './gem-puzzle/src/js/script.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, './gem-puzzle/src/js')
  }
};
