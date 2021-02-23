/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-22 18:12:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 10:17:52
 */
import React, { Component, Fragment } from 'react'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

const { createElement } = React

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggle = async() => {
    await this.setState({
      collapsed: !this.state.collapsed
    })
    this.props.toggle(this.state.collapsed)
  }

  render() {
    const { collapsed } = this.state
    return (
      <Fragment>
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: this.toggle
        })}
      </Fragment>
    )
  }
}

export default Navbar
