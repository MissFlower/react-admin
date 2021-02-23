/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-22 17:03:18
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 18:14:14
 */
import React, { Component } from 'react'

import { Layout } from 'antd'
const { Sider, Header, Content } = Layout

import './layout.scss'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PrivateRouter from 'src/components/PrivateRouter'

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggle = collapsed => {
    this.setState({
      collapsed
    })
  }

  render() {
    return (
      <Layout className="layout-wrap">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Sidebar />
        </Sider>
        <Layout>
          <Header className="layout-header">
            <Navbar toggle={this.toggle} />
          </Header>
          <Content className="layout-content">
            <PrivateRouter />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout
