import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Pagination } from 'antd'
class PaginationComponent extends Component {
  static propTypes = {
    pageSize: PropTypes.number,
    pageIndex: PropTypes.number,
    total: PropTypes.number,
    pageSizeOptions: PropTypes.array
  }

  static defaultProps = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    pageSizeOptions: [10, 20, 30, 40]
  }

  constructor(props) {
    super(props)
  }

  showTotal = total => `共 ${total} 条`

  // 每页条数改变
  onShowSizeChange = (pageIndex, pageSize) => {
    console.log('onShowSizeChange：', pageIndex, pageSize)
    this.props.change(1, pageSize)
  }

  // 页码发生改变
  onChange = (pageIndex, pageSize) => {
    console.log('onChange', pageIndex, pageSize)
    this.props.change(pageIndex, pageSize)
  }

  render() {
    const { pageSize, pageIndex, total, pageSizeOptions } = this.props
    return (
      total / pageSize > 1
        ? (
          <Fragment>
            <Pagination
              pageSizeOptions={pageSizeOptions}
              pageSize={pageSize}
              showQuickJumper
              showSizeChanger
              showTotal={this.showTotal}
              current={pageIndex}
              total={total}
              onChange={this.onChange}
              onShowSizeChange={this.onShowSizeChange}
            />
          </Fragment>
        )
        : ''
    )
  }
}

export default PaginationComponent
