/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 14:14:03
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-26 17:55:10
 */
import React, { Component, createElement } from 'react'
import { Link, withRouter } from 'react-router-dom'
import path from 'path'

import { Menu } from 'antd'
import * as Icon from '@ant-design/icons'
const { SubMenu } = Menu

// TODO 路由列表在做权限的时候会进行处理 这里的路由应该是处理后的权限路由
import { constantRouter, asyncRouter } from 'src/router'
const routes = [...constantRouter, ...asyncRouter]

// utils
import { isExternal } from 'src/utils/validate'

// 封装一个构造函数
class MenuNode {
  constructor(menuItem, parent = null) {
    this.path = path.resolve(parent?.path, menuItem.path)
    this.activeMenu = menuItem.activeMenu
    this.parent = parent
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
      selectedKeys: []
    }
    this.menuTree = []
  }

  // 生命周期
  UNSAFE_componentWillMount() {
    this.initMenu(routes)
    this.setActiveMenu()
  }

  UNSAFE_componentWillReceiveProps(props) {
    setTimeout(() => {
      !props.collapsed && this.setActiveMenu()
    }, 0)
  }

  initMenu = (routes, parent = null) => {
    routes.map(route => {
      if (route.children) {
        this.initMenu(route.children, new MenuNode(route, route.path))
      } else {
        route.path !== '*' && this.menuTree.push(new MenuNode(route, parent))
      }
    })
  }

  // 用户自定义当前路由状态
  setCustomActiveMenu = activeMenu => {
    for (let menuItem of this.menuTree) {
      if (menuItem.path === activeMenu) {
        const openKeys = []
        const selectedKeys = [menuItem.path]
        // 判断当前菜单是否有父级菜单，如果有父级菜单需要将其展开
        while (menuItem.parent) {
          openKeys.push(menuItem.parent.path)
          menuItem = menuItem.parent
        }
        this.setState({
          openKeys: openKeys,
          selectedKeys: selectedKeys
        })
      }
    }
  }

  // 通过地址栏路由设置sidebar当前路由状态
  setActiveMenu = () => {
    const { pathname } = this.props.location
    console.log(this.props)
    // 定义一个数据,判断用户是否有权限访问
    for (let menuItem of this.menuTree) {
      // 使用正则判断当前浏览器path是否与菜单项中的path相匹配，避免路由传参
      // const isActivePath = new RegExp(`^${menuItem.path}`).test(pathname)
      const isActivePath = menuItem.path === pathname
      if (isActivePath) {
        // console.log(menuItem.path, pathname)
        // 判断当前路由是否有自定义要高亮路由
        const activeMenu = menuItem.activeMenu
        if (activeMenu) {
          this.setCustomActiveMenu(activeMenu)
          return
        }
        // 没有自定义高亮路由 走默认
        const openKeys = []
        const selectedKeys = [menuItem.path]
        // 判断当前菜单是否有父级菜单，如果有父级菜单需要将其展开
        while (menuItem.parent) {
          openKeys.push(menuItem.parent.path)
          menuItem = menuItem.parent
        }
        this.setState({
          openKeys: openKeys,
          selectedKeys: selectedKeys
        })
        return
      }
    }
    // 根目录进行重定向
    if (this.props.history.location.pathname === '/') {
      this.props.history.push('/index')
      return
    }
    // 上面所有的地址都匹配不到就会进行拦截，显示没有权限，跳转到欢迎页
    if (this.props.history.location.pathname !== '/404') {
      this.props.history.push('/404')
      // message.error('对不起，您没有权限')
    }
    // 如果一个路由都没有匹配上则关闭菜单
    this.setState({
      openKeys: [],
      selectedKeys: []
    })
  }

  // 点击菜单 高光展示
  menuClick = ({ item, key, keyPath, domEvent }) => {
    this.setState({
      openKeys: [keyPath[keyPath.length - 1]],
      selectedKeys: [key]
    })
  }

  // 父集菜单处理
  renderSubMenu = ({ path, children, hidden = false, alwaysShow = false, meta: { icon, title } = { icon: '' }}) => {
    // 不展示
    if (hidden) {
      return
    }
    // 处理子路由只有一个的情况
    if (children.length === 1 && !children.children && !alwaysShow) {
      return this.renderMenuItem(path, children[0])
    }
    return (
      <SubMenu
        key={path}
        icon={
          icon && React.createElement(
            Icon[icon],
            {
              style: { fontSize: '16px' }
            }
          )
        }
        title={title}
      >
        {children.map(child => {
          return child?.children && child.children.length
            ? this.renderSubMenu(child)
            : this.renderMenuItem(path, child)
        })}
      </SubMenu>
    )
  }

  // 子集菜单处理
  renderMenuItem = (parentPath, { path, hidden = false, meta: { title, icon }}) => {
    const routerPath = this.resolvePath(parentPath, path)
    return (
      !hidden &&
      <Menu.Item
        key={routerPath}
        icon={
          icon
            ? createElement(
              Icon[icon],
              {
                style: { fontSize: '16px' }
              }
            )
            : ''
        }
      >
        {
          isExternal(routerPath)
            ? <a href={routerPath} rel="noopener noreferrer" target="_blank">{title}</a>
            : <Link to={routerPath}>{title}</Link>
        }
      </Menu.Item>
    )
  }

  resolvePath = (parentPath, routerPath) => (
    path.resolve(parentPath, routerPath)
  )

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
        openKeys: [lastOpenKey]
      })
    } else {
      this.setState({
        openKeys: lastOpenKey ? [lastOpenKey] : []
      })
    }
  }

  render() {
    const { openKeys, selectedKeys } = this.state
    return (
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={this.menuOpenChange}
        onClick={this.menuClick}
      >
        {
          routes?.map(route => {
            return route?.children && route.children.length
              ? this.renderSubMenu(route)
              : this.renderMenuItem('', route)
          })
        }
      </Menu>
    )
  }
}

export default withRouter(MenuItem)
