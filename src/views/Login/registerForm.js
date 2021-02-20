/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-18 17:22:53
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-20 16:58:28
 */
import React, { Component } from 'react'

import { Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// validate
import { validEmail } from 'src/utils/validate'
// 组件
import VerifyCode from 'src/components/VerifyCode'

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      verifyCodeBtnDisable: true
    }
  }

  onFinish = values => {
    console.log('Received values of form: ', values)
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
    const {
      username,
      verifyCodeBtnDisable
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
            className="login-form"
            initialValues={{
              remember: true
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
              name="SurePassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your SurePassword!'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="SurePassword"
                autoComplete="on"
              />
            </Form.Item>

            <Form.Item
              name="VerifyCode"
              rules={[
                {
                  required: true,
                  message: 'Please input your VerifyCode!'
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
