/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-20 14:14:35
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-02 09:54:10
 */
import React, { Component } from 'react'
import { Button } from 'antd'

import { getVerifyCode } from 'src/api/user'
// 定时器
let timer = null

class VerifyCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      verifyCodeLoading: false,
      verifyCodeBtnText: '获取验证码'
    }
  }

  // 数据通信
  UNSAFE_componentWillReceiveProps({ username, verifyCodeBtnDisable }) {
    // console.log(this.state)
    this.setState({
      username,
      verifyCodeBtnDisable
    })
  }

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.username !== nextProps.username) {
  //     return true
  //   }
  //   if (this.props.verifyCodeBtnDisable !== nextProps.verifyCodeBtnDisable) {
  //     return true
  //   }
  //   return false
  // }

  // 销毁生命周期
  componentWillUnmount() {
    clearInterval(timer)
  }

  // 获取验证码
  getVerifyCode = async() => {
    this.setState({
      verifyCodeBtnText: '发送中...',
      verifyCodeLoading: true
    })
    try {
      const { username, module } = this.state
      await getVerifyCode({
        username,
        module
      })
      this.countDown()
    } catch (error) {
      this.setState({
        verifyCodeBtnText: '重新获取',
        verifyCodeLoading: false
      })
    }
  }

  // 倒计时
  countDown = () => {
    let sec = 60
    clearInterval(timer)
    timer = setInterval(() => {
      sec--
      this.setState({
        verifyCodeBtnText: `${sec}秒`
      })
      if (sec <= 0) {
        this.setState({
          verifyCodeLoading: false,
          verifyCodeBtnText: '获取验证码'
        })
        clearInterval(timer)
      }
    }, 1000)
  }

  render() {
    const {
      verifyCodeLoading,
      verifyCodeBtnDisable,
      verifyCodeBtnText
    } = this.state
    return (
      <Button
        type="danger"
        block
        loading={verifyCodeLoading}
        disabled={verifyCodeBtnDisable}
        onClick={this.getVerifyCode}
      >
        {verifyCodeBtnText}
      </Button>
    )
  }
}

export default VerifyCode
