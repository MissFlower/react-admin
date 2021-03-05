import React, { Component } from 'react'

import './index.scss'

class SearchFormWrap extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="search-form-wrap">{this.props.children}</div>
    )
  }
}

export default SearchFormWrap
