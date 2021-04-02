/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-10-22 16:10:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-26 17:57:32
 */
import React, { Suspense } from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'src/redux'

import { Spin } from 'antd'

import PrivateRouter from 'src/components/PrivateRouter'

// TODO 路由列表在做权限的时候会进行处理 这里的路由应该是处理后的权限路由
import { constantRouter, asyncRouter } from 'src/router'
const routes = [...constantRouter, ...asyncRouter]
const store = configureStore()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderRoute = routes => (
    routes.map(route => (
      <PrivateRouter
        path={route.path}
        key={route.path}
        component={route.component}
        meta={route.meta}
        exact={route.path !== '/'}
      />
    ))
  )

  render() {
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
