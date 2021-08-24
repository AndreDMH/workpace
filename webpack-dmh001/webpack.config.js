const path = require('path');
module.exports = {
  mode:"development",
  devServer: {
    // contentBase:'',
    // publicPath: '/',
    host: 'localhost',
    port: 3000
  },
  entry:path.join(__dirname, './src/index.js'),
  output:{
    path:path.join(__dirname, './dist'),
    filename:'bundle.js',
  },
}
