import React, { Component } from 'react'
import Header from '../Header/index'
import OrderList from '../OrderList/index'
import './style.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <OrderList />
      </div>
    )
  }
}

export default App
