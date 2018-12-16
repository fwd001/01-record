import React, { Component } from 'react'
import './style.css'

class OrderItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      stars: props.data.stars || 0,
      textarea: props.data.stars || ''
    }
    this.handleCommentChange = this.handleCommentChange.bind(this)
  }
  render() {
    const { picture, name, shop, product, ifCommented } = this.props.data
    return (
      <div>
        <div>
          <div className="orderItem">
            <div className="orderItem_left">
              <div className="orderItem__picContainer">
                <img className="orderItem__pic" src={picture} alt="" />
              </div>
              <div className="orderItem_content">
                <div className="orderItem__product">{name}</div>
                <div className="orderItem__stop">{shop}</div>
                <div className="orderItem__detail">
                  <div className="orderItem__price">{product}</div>
                </div>
              </div>
            </div>
            <div className="orderItem_right">
              <div className="orderItem__buttom">
                {ifCommented ? (
                  <button className="orderItem__btn orderItem__btn--grey">
                    已评价
                  </button>
                ) : (
                  <button
                    className="orderItem__btn orderItem__btn--red"
                    onClick={this.hendOpenEditArea.bind(this)}
                  >
                    评价
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    )
  }

  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          onChange={this.handleCommentChange}
          value={this.state.comment}
          className="orderItem__comment"
          name=""
          id=""
          cols="50"
          rows="5"
        />
        {this.renderStart()}
        <div>
          <button
            className="orderItem__btn orderItem__btn--red"
            onClick={this.hendSubmitComment.bind(this)}
          >
            提交
          </button>
          <button
            className="orderItem__btn orderItem__btn--grey"
            onClick={this.hendCloseComment.bind(this)}
          >
            取消
          </button>
        </div>
      </div>
    )
  }

  renderStart() {
    const { stars } = this.state
    return (
      <div>
        {[1, 2, 3, 4, 5].map((e, index) => {
          const lightClass = stars >= e ? 'orderItem_star--light' : ''
          return (
            <span
              className={'orderItem__stars ' + lightClass}
              key={index}
              onClick={this.handleClickStart.bind(this, e)}
            >
              ★
            </span>
          )
        })}
      </div>
    )
  }
  hendCloseComment() {
    this.setState({
      editing: false,
      stars: 0,
      textarea: ''
    })
  }

  handleCommentChange(e) {
    this.setState({
      textarea: e.target.value
    })
  }
  hendOpenEditArea() {
    this.setState({
      editing: true
    })
  }

  hendSubmitComment() {
    const { id } = this.props.data
    const { textarea, stars } = this.state
    this.props.onSubmitComment(id, textarea, stars)
    this.setState({
      editing: false
    })
  }

  handleClickStart(i) {
    console.log(i)
    this.setState({
      stars: i
    })
  }
}

export default OrderItem
