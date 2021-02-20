/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-18 17:22:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-20 16:58:09
 */
import React, { Component } from 'react'

import { Form, Input, Button, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// validate
import { passwordValidate, validEmail } from 'src/utils/validate'
// API
import { login } from 'src/api/user'
// 组件
import VerifyCode from 'src/components/VerifyCode'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      verifyCodeBtnDisable: true
    }
  }

  onFinish = async values => {
    console.log('Received values of form: ', values)
    try {
      const data = await login()
      console.log(data)
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

  render() {
    const _this = this
    const {
      username,
      verifyCodeBtnDisable
    } = this.state
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
                  pattern: passwordValidate,
                  message: '请输入6-10位的数字加字母组合!'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="on"
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
                  />
                </Col>
                <Col span={9}>
                  <VerifyCode
                    username={username}
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
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )

  }
}

export default LoginForm
