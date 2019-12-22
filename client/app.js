/**
 * 客户端渲染入口文件
 */
import React from 'react'
import ReactDOM from 'react-dom'
// react-router包裹住整个app
import { BrowserRouter } from 'react-router-dom'
// react-hot-loader AppContainer包裹根结点实际想要渲染的内容,一定要放到最外面
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import appState from './store/app.state';
// eslint-disable-next-line import/extensions
import App from './views/App.jsx'

// 比对服务端和客户端代码差异，有差异用客户端

const root = document.getElementById('root');
const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App);

// 这个热更新做的也太垃圾了，这叫什么热更新，不可取
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default  // eslint-disable-line
    // ReactDOM.render(<NextApp />, document.getElementById('root'))
    render(NextApp);
  })
}
