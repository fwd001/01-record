import React, { Component } from 'react'
import './style.css'

class Footer extends Component {
  render () {
    return (
      <div>
        共{this.props.data.length}个项目,{this.props.data.filter(v=> v.ifComplted).length}个完成
      </div>
    )
  }
  static defaultProps = {
    data: []
  }
}

export default Footer
