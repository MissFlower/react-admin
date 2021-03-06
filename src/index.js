/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-10-22 16:10:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-21 15:48:16
 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'src/styles/index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { ConfigProvider } from 'antd'
// 在需要用到的 组件文件中引入中文语言包
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  // 检测代码中不合理的代码 比如ref字符串写法
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
