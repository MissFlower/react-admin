/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-22 18:10:08
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-21 13:43:27
 */
import React, { Component, Fragment } from 'react'

import MenuItem from './MenuItem'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <MenuItem />
      </Fragment>
    )
  }
}

export default Sidebar
