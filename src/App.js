/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-10-22 16:10:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-21 15:47:59
 */
import React, { Suspense } from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'src/redux'

import { Spin } from 'antd'

import PrivateRouter from 'src/components/PrivateRouter'
const path = require('path')

// TODO 路由列表在做权限的时候会进行处理 这里的路由应该是处理后的权限路由
import { constantRouter, asyncRouter } from 'src/router'
const routes = [...constantRouter, ...asyncRouter]
console.log(routes)
const store = configureStore()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // const r = this.initRouter(routes)
    // console.log(r)
  }

  // 这里的理由改造可以存储在redux中，后续的sidebar路由处理可用
  // 初始化路由器配置
  initRouter = (routes, parentPath = '') => {
    return routes.map(route => {
      if (route.children?.length) {
        // 有子路由并且不是空
        return this.initRouter(route.children, path.resolve(parentPath, route.path))
      } else {
        return this.transfromRoute(route, parentPath)
      }
    })
  }

  // 改造路由
  transfromRoute = (route, parentPath = '') => {
    console.log(parentPath, route.path)
    return {
      ...route,
      parentPath,
      fullPath: path.resolve(parentPath, route.path)
    }
  }

  renderRoute = routes => (
    routes.map(route => (
      <PrivateRouter
        path={route.path}
        key={route.path}
        component={route.component}
        meta={route.meta}
        // exact={route.path !== '/'}
        // 有子路由就不开启精准匹配 反之开启
        exact={!route.children}
      />
    ))
  )

  render() {
    // console.log('render')
    // console.log(this.renderRoute(routes))
    return (
      <Suspense fallback={<div className="loading"><Spin size="large" /></div>}>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              {this.renderRoute(routes)}
            </Switch>
          </BrowserRouter>
        </Provider>
      </Suspense>
    )
  }
}

export default App
