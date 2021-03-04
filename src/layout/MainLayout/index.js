/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-22 17:03:18
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-25 18:13:23
 */
import React, { Component } from 'react'

import { Layout } from 'antd'
const { Sider, Header, Content } = Layout

import './layout.scss'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import RouterView from './routerView'

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  UNSAFE_componentWillMount() {
    this.setState({
      collapsed: JSON.parse(localStorage.getItem('collapsed'))
    })
  }

  toggleCollapsed = () => {
    const collapsed = !this.state.collapsed
    this.setState({
      collapsed
    })
    localStorage.setItem('collapsed', collapsed)
  }

  render() {
    const { collapsed } = this.state
    return (
      <Layout className="layout-wrap">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Sidebar collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header className="layout-header">
            <Navbar collapsed={collapsed} toggleCollapsed={this.toggleCollapsed} />
          </Header>
          <Content className="layout-content">
            <RouterView />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout
