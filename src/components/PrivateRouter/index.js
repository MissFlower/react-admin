/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 11:12:12
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-26 17:26:52
 */
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getToken } from 'src/utils/token'
import getPageTitle from 'src/utils/getPageTitle'
import { TOKEN_NAME } from 'src/settings'

const whiteList = ['/login']

class PrivateRouter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { component, meta } = this.props
    const { pathname, search } = location
    const hasToken = getToken(TOKEN_NAME)
    document.title = getPageTitle(meta?.title)

    if (hasToken) {
      // 如果是登录状态 想要跳转到登录 重定向到主页
      if (pathname === '/login') {
        return <Redirect to="/" />
      } else {
        // 如果存在权限列表 直接进入
        // const hasPermissionList = store.getters.permissionList && store.getters.permissionList.length > 0
        const hasPermissionList = true
        if (hasPermissionList) {
          return (
            <Route path={pathname} component={component} />
          )
        } else {
          // 不存在权限列表 获取权限列表
        }
      }
    } else {
      if (~whiteList.indexOf(pathname)) {
        return (
          <Route path={pathname} component={component} />
        )
      } else {
        return <Redirect to={`/login?redirect=${pathname}${search}`} />
      }
    }
  }
}
// const PrivateRouter = ({ component: Component, path, meta = {}, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={routeProps => (getToken(TOKEN_NAME) || path === '/login' ? <Component {...routeProps} /> : <Redirect to="/login" />)}
//     />
//   )
// }

export default PrivateRouter
