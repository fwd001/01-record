import React, { Component } from 'react'
import './style.css'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }
  changeHandler(e) {
    // console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <input
          onKeyUp={this.add.bind(this)}
          name="content"
          type="text"
          value={this.state.content}
          onChange={this.changeHandler.bind(this)}
        />
      </div>
    )
  }
  add(e) {
    console.log(e.keyCode === 13)
    if (e.keyCode === 13) {
      this.props.add(this.state.content)
      this.setState({
        content: ''
      })
    }
  }
}

export default Input
