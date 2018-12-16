import React, { Component } from 'react';
import './App.css';
import Input from '../Input/index'
import Content from '../Content/index'
import Footer from '../Footer/index'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    fetch('./mock/order.json').then(res => {
      if (res.ok) {
        res.json().then(data => {
          this.setState({
            data
          })
        })
      }
    })
  }
  render() {
    return (
      <div className="App">
        <Input add={this.add.bind(this)}></Input>
        <Content data={this.state.data} toggle1={this.toggle.bind(this)} del={this.del.bind(this)}></Content>
        {/* <Content></Content> */}
        <Footer data={this.state.data}></Footer>
      </div>
    );
  }
  add (content) {
    if (content) {
      this.setState({
        // data: [...this.state.data, {id: this.state.data? (this.state.data[this.state.data.length - 1].id + 1): 0, content, ifComplted: false}]
        data: [{id: this.state.data.length !== 0? (Math.max(...this.state.data.map(v => v.id)) + 1): 1, content, ifComplted: false}, ...this.state.data]
      })
    } else {
      alert('请输入内容')
    }
  }
  toggle (id) {
    let newData = this.state.data.map(v => {
      return v.id === id? {
        ...v,
        ifComplted: !v.ifComplted
      }: v
    })
    this.setState({
      data: newData
    })
  }
  del (id) {
    console.log(id);
    let newData = this.state.data.filter(v => v.id !== id)
    this.setState({
      data:newData
    })
  }
}

export default App;
