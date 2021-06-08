/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-22 17:03:18
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-21 15:59:16
 */
import React, { Component } from 'react'

import { Layout } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const { Sider, Header, Content } = Layout

import {
  actions as appActions,
  getSideBarOpened
} from 'src/redux/modules/app'

import './layout.scss'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import RouterView from './routerView'

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  toggleCollapsed = () => {
    this.props.TOGGLE_SIDEBAR('aa')
  }

  render() {
    const { collapsed } = this.props
    return (
      <Layout className="layout-wrap">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Sidebar />
        </Sider>
        <Layout>
          <Header className="layout-header">
            <Navbar toggleCollapsed={this.toggleCollapsed} />
          </Header>
          <Content className="layout-content">
            <RouterView />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    collapsed: getSideBarOpened(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
