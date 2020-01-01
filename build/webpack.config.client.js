/**
 * 客户端渲染
 */
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base')
const isDevelopment = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    // path来使用绝对路径，避免相对路径的系统差异错误
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new webpack.HotModuleReplacementPlugin() // react-hot-loader
  ]
})

// 开发模式
if (isDevelopment) {
  // 一个entry可以是一个数组，代表数组中文件都会打包到一个文件中
  config.entry = {
    app: [
      'react-hot-loader/patch', // react-hot-loader
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // localhost 本机ip 127.0.0.0都可以访问
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    overlay: { // 黑色背景弹错误信息
      errors: true
    },
    // 给webpack-dev-server设置publicPath后，server访问内存中dist下的资源，都要加/public访问
    // output publicPath路径是有/public的，静态资源的路径加了/public
    publicPath: '/public',
    // 指定index是/public下的index.html
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: { // 代理
      '/api': 'http://localhost:3333'
    },
    hot: true // react-hot-loader
  }
}

module.exports = config
