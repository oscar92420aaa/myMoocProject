/**
 * 客户端渲染入口文件
 */
import React from 'react'
import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader' //react-hot-loader
import App from './App.jsx'

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default  // eslint-disable-line
    ReactDOM.render(<NextApp />, document.getElementById('root'))
  })
}
