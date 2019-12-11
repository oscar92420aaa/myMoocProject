const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    // 静态资源文件引用时的路径
    // /public/app.hash.js 区分是静态请求还是服务请求 区分路由,可以加特殊处理
    // '/public'如果写成这样，少了后面的斜杠，url会出错
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 强制在babel-loader之前进行eslint检查，如错误不继续执行
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
