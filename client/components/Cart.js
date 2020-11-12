import React from 'react'
import {
  getShoppingCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQty
} from './shopping-cart-functions'

export class Cart extends React.Component {
  constructor() {
    super()
    this.handleQtyChange = this.handleQtyChange.bind(this)
  }

  render() {
    const testProduct = {
      id: 1,
      name: 'pup-ceratops',
      price: '39.99',
      imageUrl:
        'https://ideastand.com/wp-content/uploads/2017/09/dog-halloween-costumes/4-dog-halloween-costume-diy-ideas.jpg',
      qty: 4
    }
    return (
      <div>
        <div id="shopping-cart-left">
          <div id="shopping-cart-title">
            <h3>Shopping Cart</h3>
            <hr />
          </div>
          <div id="shopping-cart-table-header">
            <p>Item</p>
            <p>Item Price</p>
            <p>Quantity</p>
            <p>Total Price</p>
            <hr />
          </div>
          {getShoppingCart().length === 0
            ? this.renderShoppingCartEmpty()
            : this.renderShoppingCart()}
        </div>
        <div id="shopping-cart-right">
          <div id="shopping-cart-order-summary-title">
            <h4>Order Summary</h4>
          </div>
          {this.renderOrderSummaryList()}
        </div>
        <button type="button" onClick={() => addProductToCart(testProduct)}>
          Add To Cart
        </button>
      </div>
    )
  }

  renderShoppingCart() {
    return getShoppingCart().map((item, idx) => {
      return (
        <div id="cart-item" key={idx}>
          <div id="cart-item-left">
            <div id="cart-item-image">
              <img src={item.imageUrl} />
            </div>
          </div>
          <div id="cart-item-right">
            <div id="cart-item-attributes">{item.name}</div>
            <div id="cart-item-price">{item.price}</div>
            <div id="cart-item-quantity">{this.renderQtyDropdown(item)}</div>
            <div id="cart-item-total-price">{item.price * item.qty}</div>
            <div id="cart-item-remove">
              <button
                type="button"
                onClick={() => removeProductFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
          <hr />
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
    const qtyVal = Array.from({length: 10}, (x, i) => i + 1)
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
    let subTotal = 0
    let shipping = 5.0
    getShoppingCart().forEach(item => (subTotal += item.price * item.qty))
    return (
      <div id="shopping-cart-order-summary-list">
        <ul>
          <li>Subtotal: ${subTotal}</li>
          <li>Shipping: ${shipping}</li>
          <li>Tax: $0.00</li>
          <li>Total: ${subTotal + shipping}</li>
        </ul>
      </div>
    )
  }

  handleQtyChange(evt, productId) {
    updateProductQty(productId, evt.target.value)
  }
}
