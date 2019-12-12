/**
 * 开发环境-服务端渲染
 */
const axios = require('axios')
const webpack = require('webpack')
const MemoryFileSystem = require('memory-fs') // 从内存中读取文件
const path = require('path')
const ReactDOMServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const Module = module.constructor

const mfs = new MemoryFileSystem()

const webpackServerConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(webpackServerConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))
  // 服务端bundle路径
  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  )

  // 读出来的bundle是一个stream，不是js中的模块
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  // 把stream生成新的js模块,一定要指定名字
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

// 通过webpack-dev-server实时拿到template文件
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    // 请求本地服务器中的html
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://127.0.0.1:8888'
  }))

  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactDOMServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
