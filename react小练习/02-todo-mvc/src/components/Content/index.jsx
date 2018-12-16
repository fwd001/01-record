import React, { Component } from 'react'
import './style.css'

class Content extends Component {
  render() {
    const { data } = this.props
    return <ul>{data.map(v => this.listRender(v))}</ul>
  }

  listRender(v) {
    // console.log(v);
    const classname = v.ifComplted? 'normal done' :'normal' 
    return (
      <li key={v.id}>
        <span className={classname} onClick={this.toggle.bind(this, v.id)}/>
        <span>{v.content}</span>
        <span className={'close'} onClick={() => {this.del(v.id)}}>x</span>
      </li>
    )
  }
  toggle (id) {
    this.props.toggle1(id)
  }
  del (id) {
    this.props.del(id)
    // console.log(id);
  } 
}

Content.defaultProps = {
  data: []
}

export default Content
