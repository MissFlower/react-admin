/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 14:14:03
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 17:32:33
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import * as Icon from '@ant-design/icons'
const { SubMenu } = Menu

import { constantRouter, asyncRouter } from 'src/router'
const routes = [...constantRouter, ...asyncRouter]

class MenuItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: ''
    }
  }

  // 子集菜单处理
  renderSubMenu = route => {
    // 处理子路由只有一个的情况
    if (route.children.length === 1 && !route.children.children && !route.alwaysShow) {
      return this.renderMenuItem(route.children[0])
    }

    const { path, children } = route
    const icon = route?.meta?.icon
    return (
      <SubMenu
        key={path}
        icon={
          icon
            ? React.createElement(
              Icon[icon],
              {
                style: { fontSize: '16px' }
              }
            )
            : ''
        }
        title={route?.meta?.title}
      >
        {children.map(child => {
          return child?.children && child.children.length
            ? this.renderSubMenu(child)
            : this.renderMenuItem(child)
        })}
      </SubMenu>
    )
  }

  // 无子集菜单处理
  renderMenuItem = ({ path, meta: { title, icon }}) => {
    return (
      <Menu.Item
        key={path}
        icon={
          icon
            ? React.createElement(
              Icon[icon],
              {
                style: { fontSize: '16px' }
              }
            )
            : ''
        }
      >
        <Link to={path}>{title}</Link>
      </Menu.Item>
    )
  }

  menuOpenChange = openKeys => {
    // 反复点击一个菜单组
    if (openKeys.length === 1 || openKeys.length === 0) {
      this.setState({
        openKeys
      })
      return
    }
    const lastOpenKey = openKeys[openKeys.length - 1]
    // 如果点击的还是同一个大菜单下
    if (lastOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [lastOpenKey]
      })
    }
  }

  render() {
    const { openKeys } = this.state
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={['']}
        defaultSelectedKeys={['/index']}
        openKeys={openKeys}
        onOpenChange={this.menuOpenChange}
      >
        {
          routes?.map(route => {
            return route?.children && route.children.length
              ? this.renderSubMenu(route)
              : this.renderMenuItem(route)
          })
        }
      </Menu>
    )
  }
}

export default MenuItem
