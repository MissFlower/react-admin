/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 11:12:12
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 13:27:20
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getToken } from 'src/utils/token'
import { TOKEN_NAME } from 'src/settings'

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => (getToken(TOKEN_NAME) ? <Component {...routeProps} /> : <Redirect to="/login" />)}
    />
  )
}

export default PrivateRouter
