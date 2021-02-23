/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-18 17:22:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 11:39:36
 */
import React, { Component } from 'react'
// 通过withRouter加工后的组件会多出一个history props 这是就可以通过history的push方法跳转路由了
import { withRouter } from 'react-router-dom'

import { Form, Input, Button, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// validate
import { passwordReg, validEmail } from 'src/utils/validate'
// 加密
import CryptoJs from 'crypto-js'
// API
import { login } from 'src/api/user'
// 组件
import VerifyCode from 'src/components/VerifyCode'
// token
import { setToken } from 'src/utils/token'
import { TOKEN_NAME } from 'src/settings'

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
    console.log('Received values of form: ', values)
    try {
      const { username, password, verifyCode } = this.state
      this.setState({
        loading: true
      })
      const { token } = await login({
        username,
        password: CryptoJs.MD5(password).toString(),
        code: verifyCode
      })
      setToken(TOKEN_NAME, token)
      this.props.history.push('/index')
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

  // username输入
  usernameChange = e => {
    const val = e.target.value
    this.setState({
      username: val
    })
  }

  // password输入
  passwordChange = e => {
    const val = e.target.value
    this.setState({
      password: val
    })
  }

  // verifyCode输入
  verifyCodeChange = e => {
    const val = e.target.value
    this.setState({
      verifyCode: val
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
                onChange={this.usernameChange}
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
                placeholder="Password"
                autoComplete="on"
                onChange={this.passwordChange}
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
                    onChange={this.verifyCodeChange}
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

export default withRouter(LoginForm)
