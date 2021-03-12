/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-24 11:09:33
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-10 14:28:10
 */
import React, { Component, Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { Spin } from 'antd'
import path from 'path'

import PrivateRouter from 'src/components/PrivateRouter'

// TODO 路由列表在做权限的时候会进行处理 这里的路由应该是处理后的权限路由
import { constantRouter, asyncRouter } from 'src/router'
const routes = [...constantRouter, ...asyncRouter]

class RouterView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  resolvePath = (parentPath, routerPath) => (
    path.resolve(parentPath, routerPath)
  )

  renderRoute = (routes, parentPath = '') => {
    return routes.map(route => {
      if (route.children) {
        return this.renderRoute(route.children, route.path)
      } else {
        const routerPath = this.resolvePath(parentPath, route.path)
        return (
          <PrivateRouter
            path={routerPath}
            key={routerPath}
            component={route.component}
            meta={route.meta}
            exact
          />
        )
      }
    })
  }

  render() {
    // console.log(this.renderRoute(routes))
    return (
      <Suspense fallback={<div className="loading"><Spin size="large" /></div>}>
        <Switch>
          {this.renderRoute(routes)}
        </Switch>
      </Suspense>
    )
  }
}

export default RouterView
