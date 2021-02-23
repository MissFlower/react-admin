/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-18 17:22:53
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-22 16:46:04
 */
import React, { Component } from 'react'

import { Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// validate
import { validEmail, validPassword } from 'src/utils/validate'
// 加密
import CryptoJs from 'crypto-js'
// API
import { register } from 'src/api/user'
// 组件
import VerifyCode from 'src/components/VerifyCode'

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      surePassword: '',
      verifyCode: '',
      verifyCodeBtnDisable: true,
      module: 'register'
    }
    this.refForm = React.createRef()
    this.refPassword = React.createRef()
  }

  onFinish = async values => {
    console.log('Received values of form: ', values)
    const { username, password, verifyCode } = this.state
    try {
      const data = await register({
        username,
        password: CryptoJs.MD5(password).toString(),
        code: verifyCode
      })
      this.toggleForm('login')
    } catch (error) {
      console.log(error)
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
    if (this.state.surePassword) {
      this.refForm.current.validateFields(['surePassword'])
    }
  }

  // surePassword输入
  surePasswordChange = e => {
    const val = e.target.value
    this.setState({
      surePassword: val
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
    const {
      username,
      password,
      verifyCodeBtnDisable,
      module
    } = this.state
    const _this = this
    return (
      <div className="login">
        <div className="form-header">
          <h4 className="column">注册</h4>
          <span onClick={() => this.toggleForm('login')}>账号登录</span>
        </div>

        <div className="form-content">
          <Form
            name="normal_login"
            ref={this.refForm}
            className="login-form"
            initialValues={{
              // surePassword: ''
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
                prefix={<UserOutlined className="site-form-item-icon" />}
                onChange={this.usernameChange}
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
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    const isPass = validPassword(value)
                    if (!isPass) {
                      return Promise.reject('请输入6-10位的字母加数字组合!')
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input
                value={password}
                ref={this.refPassword}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="on"
                onChange={this.passwordChange}
              />
            </Form.Item>

            <Form.Item
              name="surePassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your SurePassword!'
                },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    // console.log(_this.refPassword.current)
                    console.log(_this.refForm)
                    const isPass = validPassword(value)
                    if (!isPass) {
                      return Promise.reject('请输入6-10位的字母加数字组合!')
                    }
                    const password = getFieldValue('password')
                    console.log(value, password)
                    if (password !== '' && value !== password) {
                      return Promise.reject('确认密码和密码不一致!')
                    }
                    await _this.refForm.current.resetFields(['password'])
                    await _this.refForm.current.setFieldsValue({ password })
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="SurePassword"
                autoComplete="on"
                onChange={this.surePasswordChange}
              />
            </Form.Item>

            <Form.Item
              name="verifyCode"
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
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default RegisterForm
