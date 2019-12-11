/**
 * 客户端渲染入口文件
 */
import React from 'react'
import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader' //react-hot-loader
import App from './App.jsx'

// 比对服务端和客户端代码差异，有差异用客户端
ReactDOM.hydrate(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default  // eslint-disable-line
    ReactDOM.render(<NextApp />, document.getElementById('root'))
  })
}
