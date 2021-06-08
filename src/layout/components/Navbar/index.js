/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-22 18:12:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-21 13:44:24
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
  }

  toggleCollapsed = () => {
    this.props.toggleCollapsed()
  }

  render() {
    return (
      <Fragment>
        {createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          style: { fontSize: '16px' },
          onClick: this.toggleCollapsed
        })}
      </Fragment>
    )
  }
}

export default Navbar
