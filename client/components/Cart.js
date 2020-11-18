import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, removeItem, updateItemQty, addItem} from '../store/cart'
import {getShoppingCart} from '../shopping-cart-functions'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import currency from 'currency.js'
import {editOrderStatus} from '../store/cart'
import {fetchActiveCartOrder} from '../store/cart'

export class Cart extends React.Component {
  constructor() {
    super()

    this.state = {
      redirectToCheckout: false
    }
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleClick() {
    this.props
      .editOrderStatus(this.props.orderId)
      .then(this.props.fetchActiveCartOrder(this.props.user.user.id))
    this.setState({redirectToCheckout: true})
  }

  render() {
    const redirectToCheckout = this.state.redirectToCheckout
    return (
      <div className="main-content">
        <div className="shopping-cart">
          <div id="shopping-cart-left">
            <div id="shopping-cart-title">
              <h1>Shopping Cart</h1>
              <hr />
            </div>
            {getShoppingCart().length === 0
              ? this.renderShoppingCartEmpty()
              : this.renderShoppingCart()}
          </div>
          <div className="shopping-cart-right">
            <div id="shopping-cart-order-summary-title">
              <h4>Order Summary</h4>
            </div>
            {this.renderOrderSummaryList()}
          </div>
          <div>
            <p>
              <button
                type="button"
                className="button"
                onClick={() => this.handleClick()}
              >
                CHECKOUT
              </button>
            </p>
            {redirectToCheckout && <Redirect to="/checkout" />}
          </div>
        </div>
      </div>
    )
  }

  renderShoppingCart() {
    return getShoppingCart().map((item, idx) => {
      return (
        <div className="cart-item" key={idx}>
          <div className="cart-item-left">
            <div className="cart-item-image">
              <img src={item.imageUrl} />
            </div>
          </div>
          <div className="cart-item-right">
            <div id="cart-item-attributes">Name: {item.name}></div>
            <div id="cart-item-price">
              Price: {currency(item.price).format()}
            </div>
            <div id="cart-item-quantity">
              Quantity: {this.renderQtyDropdown(item)}
            </div>
            <div id="cart-item-total-price">
              Total:
              {currency(item.price)
                .multiply(item.qty)
                .format()}
            </div>
            <div id="cart-item-remove">
              <button
                type="button"
                onClick={() =>
                  this.props.removeItem(item.id, this.props.orderId)
                }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )
    })
  }

  renderShoppingCartEmpty() {
    return (
      <div id="cart-empty">
        <h2>Your shopping cart is empty.</h2>
      </div>
    )
  }

  renderQtyDropdown(item) {
    const qtyVal = Array.from({length: 10}, (_, i) => i + 1)
    return (
      <select
        name="qty"
        id="qty"
        value={item.qty}
        onChange={evt => this.handleQtyChange(evt, item.id)}
      >
        {qtyVal.map((val, idx) => {
          return (
            <option value={val} key={idx}>
              {val}
            </option>
          )
        })}
      </select>
    )
  }

  renderOrderSummaryList() {
    let subTotal = currency(0)
    let shipping = getShoppingCart().length === 0 ? currency(0) : currency(5)
    getShoppingCart().forEach(item => {
      subTotal = subTotal.add(currency(item.price).multiply(item.qty))
    })
    return (
      <div id="shopping-cart-order-summary-list">
        <ul>
          <li>Subtotal: {subTotal.format()}</li>
          <li>Shipping: {shipping.format()}</li>
          <li>Tax: $0.00</li>
          <li>Total: {subTotal.add(shipping).format()}</li>
        </ul>
      </div>
    )
  }

  handleQtyChange(evt, productId) {
    let qtyNum = parseInt(evt.target.value)
    return this.props.updateItemQty(productId, qtyNum, this.props.orderId)
  }
}

const mapState = state => {
  return {
    cart: state.cartReducer.cart,
    orderId: state.cartReducer.orderId,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    removeItem: (id, orderId) => dispatch(removeItem(id, orderId)),
    addItem: (product, qty, orderId) =>
      dispatch(addItem(product, qty, orderId)),
    updateItemQty: (productId, qty, orderId) =>
      dispatch(updateItemQty(productId, qty, orderId)),
    editOrderStatus: id => dispatch(editOrderStatus(id)),
    fetchActiveCartOrder: userId => dispatch(fetchActiveCartOrder(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
