/**
 * 服务端渲染入口文件
 */
// 文件中用了jsx的写法(<App/>)，就必须引入react
import React from 'react'
import { StaticRouter } from 'react-router-dom' // react-router服务端渲染组件
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import { createStoreMap } from './store/store'

// 让mobx在服务端渲染的时候不会重复得数据变换
useStaticRendering(true);

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
