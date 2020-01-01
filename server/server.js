const express = require('express')
const ReactSSR = require('react-dom/server') // react ssr模块，官方提供
const favicon = require('serve-favicon')
const bodyParser = require('body-parser') // cnode api
const session = require('express-session') // cnode api

const fs = require('fs')
const path = require('path')

// 开发时的服务端渲染
console.log(111)
const isDev = process.env.NODE_ENV === 'development'

const app = express()

// parse application/json
app.use(bodyParser.json());  // cnode api

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));  // cnode api

app.use(session({  // cnode api
  maxAge: 10*60*1000,
  name: 'tid', // cookie name
  resave: false, // 每次请求是否要重新生成cookid id
  saveUninitialized: false, // 每次请求是否要重新生成cookid id
  secret: 'react cnode class', // 用这个字符串加密cookie,保证字符串在浏览器cookie没有办法被人解密
}));

app.use('/api/user', require('./util/hanle.login'))
app.use('/api', require('./util/proxy'))

app.use(favicon(path.join(__dirname, '../favicon.ico'))) // 更改favicon

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // 给静态文件指定相应的文件返回
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res) { // ‘*’代表浏览器发出的任何请求
    const appString = ReactSSR.renderToString(serverEntry)

    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev.static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is listen on 3333')
})
