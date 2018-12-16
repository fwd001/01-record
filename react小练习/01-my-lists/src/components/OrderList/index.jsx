import React, { Component } from 'react'
import OrderItem from '../OrderItem'

class OrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    fetch('/mock/order.json').then(res => {
      if (res.ok) {
        res.json().then(data => {
          console.log(data)
          this.setState({
            data
          })
        })
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.data.map(v => (
          <OrderItem
            key={v.id}
            data={v}
            onSubmitComment={this.onSubmitComment.bind(this)}
          />
        ))}
      </div>
    )
  }

  onSubmitComment(id, textarea, stars) {
    let newData = this.state.data.map(v => {
      return v.id === id
        ? {
            ...v,
            textarea,
            stars,
            ifCommented: true
          }
        : v
    })

    this.setState({
      data: newData
    })
  }
}

export default OrderList
