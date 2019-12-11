const express = require('express')
const ReactSSR = require('react-dom/server') // react ssr模块，官方提供
const favicon = require('serve-favicon')

const fs = require('fs')
const path = require('path')

// 开发时的服务端渲染
const isDev = process.env.NODE_ENV === 'development'

const app = express()

// app.use(favicon(__dirname, '../favicon')) // 更改favicon

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // 给静态文件指定相应的文件返回
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res) { // ‘*’代表浏览器发出的任何请求
    const appString = ReactSSR.renderToString(serverEntry)

    res.send(template.replace('<app></app>', appString))
  })
} else {
  const devStatic = require('./util/dev.static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is listen on 3333')
})
