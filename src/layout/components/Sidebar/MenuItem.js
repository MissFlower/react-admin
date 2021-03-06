/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 14:14:03
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-21 16:14:46
 */
import React, { Component, createElement } from 'react'
import { Link, withRouter } from 'react-router-dom'
import path from 'path'

import { Menu } from 'antd'
import * as Icon from '@ant-design/icons'
const { SubMenu } = Menu

import { connect } from 'react-redux'
import {
  getSideBarOpened
} from 'src/redux/modules/app'

// TODO 路由列表在做权限的时候会进行处理 这里的路由应该是处理后的权限路由
import { constantRouter, asyncRouter } from 'src/router'
const routes = [...constantRouter, ...asyncRouter]

// utils
import { isExternal } from 'src/utils/validate'

// 封装一个构造函数
class MenuNode {
  constructor(menuItem, parent = null) {
    this.path = path.resolve(parent?.path || '', menuItem.path)
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
    this.lastOpenKeys = []
  }

  // 生命周期
  componentDidMount() {
    const { collapsed } = this.props
    this.initMenu(routes)
    this.watchCollapsed(collapsed)
    this.setActiveMenu()
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (nextProp.collapsed !== this.props.collapsed) {
      this.watchCollapsed(nextProp.collapsed)
    }
    if (nextProp.location.pathname !== this.props.location.pathname) {
      this.setActiveMenu(nextProp.location)
    }
  }

  watchCollapsed = collapsed => {
    if (collapsed) {
      this.lastOpenKeys = this.state.openKeys
      this.setState({
        openKeys: []
      })
    } else {
      this.setState({
        openKeys: this.lastOpenKeys
      }, () => {
        this.lastOpenKeys = []
      })
    }
  }

  initMenu = (routes, parent = null) => {
    routes.map(route => {
      if (route.children) {
        this.initMenu(route.children, new MenuNode(route, parent))
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
  setActiveMenu = (path) => {
    const { pathname } = path || this.props.location
    // console.log(this.props)
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
        console.log(selectedKeys)
        // 判断当前菜单是否有父级菜单，如果有父级菜单需要将其展开
        while (menuItem.parent) {
          openKeys.push(menuItem.parent.path)
          menuItem = menuItem.parent
        }
        this.setState({
          openKeys,
          selectedKeys
        })
        if (this.props.collapsed) {
          this.lastOpenKeys = openKeys
          this.setState({
            openKeys: []
          })
        }
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
          if (child?.children?.length) {
            // 处理路由中我们定义的path和父级的path进行拼接 满足我们定义路由的path时不必每次重复写父级的path 在这一步进行处理
            child.path = this.resolvePath(path, child.path)
            return this.renderSubMenu(child)
          } else {
            return this.renderMenuItem(path, child)
          }
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
    // console.log(openKeys)
    if (openKeys.length === 1 || openKeys.length === 0) {
      this.setState({
        openKeys
      })
      return
    }
    const lastOpenKey = openKeys[openKeys.length - 1]
    // 如果点击的还是同一个大菜单下
    if (lastOpenKey.includes(openKeys[0])) {
      // console.log('ninliale')
      this.setState({
        openKeys
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
const mapStateToProps = (state, props) => {
  return {
    collapsed: getSideBarOpened(state)
  }
}
export default connect(mapStateToProps, null)(withRouter(MenuItem))
