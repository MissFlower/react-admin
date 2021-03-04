/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-24 11:09:33
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-02 14:55:34
 */
import React, { Component, Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { Spin } from 'antd'

import PrivateRouter from 'src/components/PrivateRouter'

// TODO 路由列表在做权限的时候会进行处理 这里的路由应该是处理后的权限路由
import { constantRouter, asyncRouter } from 'src/router'
const routes = [...constantRouter, ...asyncRouter]

class RouterView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderRoute = routes => {
    return routes.map(route => {
      if (route.children) {
        return this.renderRoute(route.children)
      } else {
        return (
          <PrivateRouter
            path={route.path}
            key={route.path}
            exact
            component={route.component}
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
