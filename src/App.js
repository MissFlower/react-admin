/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-10-22 16:10:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-05 09:49:12
 */
import React, { Suspense } from 'react'
import { Switch, BrowserRouter, Redirect } from 'react-router-dom'

import { Spin } from 'antd'

import PrivateRouter from 'src/components/PrivateRouter'

// TODO 路由列表在做权限的时候会进行处理 这里的路由应该是处理后的权限路由
import { constantRouter } from 'src/router'
const routes = [...constantRouter]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderRoute = routes => {
    // const routeList = new Set()
    // routes.map(route => {
    //   routeList.add({
    //     path: route.path,
    //     component: route.component,
    //     exact: !route.path === '/app'
    //   })
    // })
    // const routeLists = []

    return routes.map(item => (
      <PrivateRouter
        path={item.path}
        key={item.path}
        component={item.component}
        exact={item.path !== '/app'}
      />
    ))
  }

  render() {
    // console.log(this.renderRoute(routes))
    return (
      <Suspense fallback={<div className="loading"><Spin size="large" /></div>}>
        <BrowserRouter>
          <Switch>
            {this.renderRoute(routes)}
            <Redirect to="/app/index" from="" />
          </Switch>
        </BrowserRouter>
      </Suspense>
    )
  }
}

export default App
