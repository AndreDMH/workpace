const path = require('path');
module.exports = {
  mode:"development",
  devServer: {
    static: {
      directory: path.join(__dirname, '/'), //调整目录路径 默认是public  若不配置 就会 404 not found  cannot GET/
    },
    compress: true,
    host: 'localhost',
    port: 3000,
  },
  entry:path.join(__dirname, './src/index.js'),
  output:{
    path:path.join(__dirname, './dist'),
    filename:'bundle.js',
  },
}
