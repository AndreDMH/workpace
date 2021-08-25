const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({//创建插件的实例对象
    template:'./src/index.html',//指定要用到的模板文件
    filename:'index.html'//指定生成文件的名称，该文件存在于内存之中，在目录中不显示
})
module.exports = {
  mode:"development",
  devServer: {
    static: {
      directory: path.join(__dirname, '/'), //调整目录路径 默认是public  若不配置 就会 404 not found  cannot GET/
    },
    compress: true,//当它被设置为true的时候对所有的服务器资源采用gzip压缩
    host: 'localhost',
    port: 3000,
  },
  entry:path.join(__dirname, './src/index.js'),
  output:{
    path:path.join(__dirname, './dist'),
    filename:'bundle.js',
  },
  plugins:[htmlPlugin], //plugins 数组是webpack打包期间会用到的一些插件列表
  module:{
    rules:[
      {test:/\.css$/,use:['style-loader','css-loader','postcss-loader']}, //这里的loader顺序是固定的，必须先打包style-loader然后在打包css-loader loader的调用顺序是从后往前调，也就是说先调用css-loader,其次是style-loader
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.png|jpg|gif|bmp|svg|ttf|eot|woff|woff2$/,use:['url-loader?limit=10000']},
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
    ]
  }
}
