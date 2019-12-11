/**
 * 服务端渲染
 */
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  target: 'node', // js打包出来的内容是使用在哪个执行环境中
  entry: {
    app: path.join(__dirname, '../client/server-entry.js') // 不是app.js
  },
  output: {
    // 1.node没有浏览器缓存，所以不用[name].[hash].js 2.输出文件需要引入，要容易记住
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' // 打包出来的js使用的模块方案，最新的commonjs方案，适用于node
  }
})
