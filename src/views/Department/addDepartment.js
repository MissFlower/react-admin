/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 14:45:43
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-03 15:51:49
 */
import React, { Component } from 'react'

import { Form, Input, InputNumber, Button, Radio } from 'antd'

import { addDepartment, getDepartmentDetail, editDepartment } from 'src/api/department'

const layout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 16
  }
}
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

class AddDepartment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'ADD', // 添加ADD 编辑EDIT
      id: ''
    }
    this.refForm = null
  }

  UNSAFE_componentWillMount() {
    const { type = '', id = '' } = this.props.location.state || {}
    if (id && type) {
      this.setState({
        type,
        id
      })
      this.getDepartmentDetail(id)
    }
  }

  onFinish = async values => {
    const { type, id } = this.state
    switch (type) {
      case 'ADD':
        await addDepartment(values)
        break

      case 'EDIT':
        await editDepartment({
          ...values,
          id
        })
        break

      default:
        break
    }
    this.refForm.resetFields()
  }

  getDepartmentDetail = async id => {
    const data = await getDepartmentDetail({ id })
    this.refForm.setFieldsValue(data)
  }

  render() {
    return (
      <Form
        {...layout}
        name="nest-messages"
        ref={el => this.refForm = el}
        onFinish={this.onFinish}
        validateMessages={validateMessages}
        initialValues={{
          number: 20,
          status: true
        }}
      >
        <Form.Item
          name={'name'}
          label="部门名称"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'number'}
          label="人员数量"
          rules={[
            {
              required: true,
              type: 'number',
              min: 1,
              max: 99
            }
          ]}
        >
          <InputNumber min={0} max={99} />
        </Form.Item>

        <Form.Item name={'status'} label="禁启用">
          <Radio.Group>
            <Radio value>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name={'content'}
          label="描述"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default AddDepartment
