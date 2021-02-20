/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-18 16:18:33
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-19 18:28:56
 */
import React, { Component } from 'react'

import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import './index.scss'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      formType: 'login'
    }
  }

  toggleForm = type => {
    this.setState({
      formType: type
    })
  }
  render() {
    return (
      <div className="form-wrap">
        {
          this.state.formType === 'login'
            ? <LoginForm toggleForm={this.toggleForm} />
            : <RegisterForm toggleForm={this.toggleForm} />
        }
      </div>
    )
  }
}

export default Login
