/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 11:12:12
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-02 09:27:27
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getToken } from 'src/utils/token'
import { TOKEN_NAME } from 'src/settings'

const PrivateRouter = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => (getToken(TOKEN_NAME) || path === '/login' ? <Component {...routeProps} /> : <Redirect to="/login" />)}
    />
  )
}

export default PrivateRouter
