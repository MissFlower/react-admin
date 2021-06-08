/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-18 17:22:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-19 15:00:01
 */
import React, { Component } from 'react'
// 通过withRouter加工后的组件会多出一个history props 这是就可以通过history的push方法跳转路由了
import { withRouter } from 'react-router-dom'

import { Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// validate
import { passwordReg, validEmail } from 'src/utils/validate'
// 加密
import CryptoJs from 'crypto-js'
// 组件
import VerifyCode from 'src/components/VerifyCode'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as userActions } from 'src/redux/modules/user'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      verifyCode: '',
      verifyCodeBtnDisable: true,
      module: 'login',
      loading: false
    }
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return
    }
  }

  onFinish = async values => {
    const path = this.props.location.search.split('?redirect=')[1] || '/'
    try {
      const { password, verifyCode } = this.state
      this.setState({
        loading: true
      })
      await this.props.LOGIN({
        username: this.state.username,
        password: CryptoJs.MD5(password).toString(),
        code: verifyCode
      })
      this.props.history.push(path)
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  toggleForm = type => {
    // 调用父级方法
    this.props.toggleForm(type)
  }

  // 处理用户名 密码 验证码变化处理值
  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const _this = this
    const {
      username,
      verifyCodeBtnDisable,
      module,
      loading
    } = this.state
    // console.log(`数据改变---${username}---render函数重新执行`)
    return (
      <div className="login">
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={() => this.toggleForm('register')}>账号注册</span>
        </div>

        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
            // username: '362554452@qq.com',
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!'
                },
                // {
                //   type: 'email',
                //   message: 'Please input Correct Email Format!'
                // },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const isPass = validEmail(getFieldValue('username'))
                    _this.setState({
                      verifyCodeBtnDisable: !isPass
                    })
                    if (isPass) {
                      return Promise.resolve()
                    }
                    return Promise.reject('Please input Correct Email Format!')
                  }
                })
              ]}
            >

              <Input
                value={username}
                name="username"
                onChange={this.handleChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                },
                {
                  pattern: passwordReg,
                  message: '请输入6-10位的数字加字母组合!'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="on"
                onChange={this.handleChange}
              />
            </Form.Item>

            <Form.Item
              name="verifyCode"
              validateTrigger={['onBlur']}
              rules={[
                {
                  required: true,
                  message: 'Please input your VerifyCode!'
                },
                {
                  len: 6,
                  message: '请输入6位有效验证码!'
                }
              ]}
            >
              <Row gutter={16}>
                <Col span={15}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="VerifyCode"
                    name="verifyCode"
                    onChange={this.handleChange}
                  />
                </Col>
                <Col span={9}>
                  <VerifyCode
                    username={username}
                    module={module}
                    verifyCodeBtnDisable={verifyCodeBtnDisable}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )

  }
}

// 容器组件
/* 通过connect进行连接生成容器组件 */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(userActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginForm))
