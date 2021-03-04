/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 14:45:28
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-04 18:00:58
 */
import React, { Component, Fragment } from 'react'

import { Form, Input, Button, Table, Switch, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { getDepartmentList, deleteDepartmentList, changeStatus } from 'src/api/department'

import TableListWrap from 'src/components/TableListWrap'
import Pagination from 'src/components/Pagination'

class DepartmentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        name: '',
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      selectedRowKeys: [],
      columns: [
        {
          title: '部门名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '禁启用',
          dataIndex: 'status',
          key: 'status',
          render: (status, record) => (
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked={status}
              onChange={() => this.switchChangeHandle(record)}
            />
          )
        },
        {
          title: '人员数量',
          dataIndex: 'number',
          key: 'number'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: 200,
          render: (text, record) => (
            <div className="operation_btn">
              <Button type="primary" onClick={() => this.editHandle(record)}>编辑</Button>
              <Button onClick={() => this.deleteDepartmentListHandle(record.id)}>删除</Button>
            </div>
          )
        }
      ],
      tableData: []
    }
    this.refForm = null
  }

  UNSAFE_componentWillMount() {
    this.getList({
      ...this.state.params
    })
  }

  // 监听组件内部状态的变化
  UNSAFE_componentWillReceiveProps(props) {
    console.log(props)
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  // 获取部门列表
  getList = async() => {
    const { params } = this.state
    const { data, total } = await getDepartmentList(params)
    this.setState({
      tableData: data.map(item => ({
        ...item,
        key: item.id
      })),
      total
    })
  }

  // 批量删除|删除 部门列表
  deleteDepartmentListHandle = id => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除已选择的数据?',
      closable: true,
      okText: '确认',
      cancelText: '取消',
      onOk: async() => {
        const { selectedRowKeys } = this.state
        if (!id) {
          id = selectedRowKeys.join()
        }
        await deleteDepartmentList({ id })
        selectedRowKeys.length && this.setState({
          selectedRowKeys: []
        })
        this.getList()
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  // 修改禁启用状态
  switchChangeHandle = async({ id, status }) => {
    await changeStatus({
      id,
      status: !status
    })
  }

  // 编辑跳转
  editHandle = ({ id }) => {
    this.props.history.push({
      pathname: '/app/department/edit',
      state: {
        type: 'EDIT',
        id
      }
    })
  }

  // 获取name
  nameChange = e => {
    const params = Object.assign(this.state.params, { name: e.target.value })
    this.setState({
      params
    })
  }

  // 查询
  search = ({ name }) => {
    // 每次查询需要重置数据
    this.setState({
      params: {
        name,
        pageNumber: 1,
        pageSize: 10
      }
    })
    this.getList()
  }

  // 重置
  reset = () => {
    this.refForm.resetFields()
    const { name } = this.refForm.getFieldsValue()
    this.setState({
      params: {
        name,
        pageNumber: 1,
        pageSize: 10
      }
    }, () => {
      this.getList()
    })
  }

  // 获取复选框选中内容
  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  // 批量删除button disabled状态
  batchDeleteDisabled = () => !this.state.selectedRowKeys.length

  // 分页查询
  pageChange = (pageIndex, pageSize) => {
    const { name } = this.state.params
    this.setState({
      params: {
        name,
        pageNumber: pageIndex,
        pageSize
      }
    }, function() {
      this.getList()
    })
  }

  render() {
    const { columns, tableData, total } = this.state
    const { pageNumber, pageSize } = this.state.params
    const rowSelection = {
      onChange: this.onSelectChange
    }
    return (
      <Fragment>
        <Form
          layout="inline"
          ref={el => this.refForm = el}
          onFinish={this.search}
          initialValues={{
            name: '123'
          }}
        >
          <Form.Item
            name="name"
            label="部门名称"
          >
            <Input placeholder="请输入部门名称" onChange={this.nameChange} />
          </Form.Item>

          <Form.Item shouldUpdate className="search-btn">
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button onClick={this.reset}>重置</Button>
          </Form.Item>
        </Form>

        <TableListWrap>
          <div slot="header">
            <Button type="primary" className="operation-left" disabled={this.batchDeleteDisabled()} onClick={() => this.deleteDepartmentListHandle()}>批量删除</Button>
            <Button type="primary" className="operation-right">数据下载</Button>
          </div>

          <Table
            columns={columns}
            dataSource={tableData}
            bordered
            rowSelection={rowSelection}
            pagination={false}
          />

          <div slot="footer">
            <Pagination
              total={30 || total}
              pageIndex={pageNumber}
              pageSize={pageSize}
              change={this.pageChange}
            />
          </div>
        </TableListWrap>
      </Fragment>
    )
  }
}

export default DepartmentList
