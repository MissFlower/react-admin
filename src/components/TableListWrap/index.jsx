import React, { Component } from 'react'

import './index.scss'

class TableListWrap extends Component {
  constructor(props) {
    super(props)
  }

  renderChild = (child, index = 0) => {
    switch (child.props.slot) {
      case 'header':
        return <div className="table-operation clearfix" key={index}>{child.props.children}</div>

      case 'footer':
        return <div className="table-footer" key={index}>{child.props.children}</div>

      default:
        return <div className="table-wrap" key={index}>{child}</div>
    }
  }

  render() {
    const { children } = this.props
    return (
      <div className="table-list-wrap">
        {
          children && Array.isArray(children)
            ? children.map((child, index) => this.renderChild(child, index))
            : this.renderChild(children)
        }
      </div>
    )
  }
}

export default TableListWrap
