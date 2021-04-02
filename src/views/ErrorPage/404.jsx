import React, { Component } from 'react'

import { Button, Image } from 'antd'
import './404.scss'

class ErrorPage404 extends Component {
  constructor() {
    super()
    this.state = {}
  }

  backIndex = () => {
    this.props.history.push('/index')
  }

  render() {
    return (
      <div className="error-container">
        <Image src={require('src/assets/images/404.png').default} preview={false} className="image" />
        <div className="tips-container">
          <div className="tip-text">您的访问出错了</div>
          <div className="tip-text">很抱歉，您访问的页面不存在，请检查您输入的地址是否正确</div>
          <Button type="primary" size={14} className="back-index" onClick={this.backIndex}>返回首页</Button>
        </div>
      </div>
    )
  }
}

export default ErrorPage404
