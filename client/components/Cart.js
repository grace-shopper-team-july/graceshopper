import React from 'react'
import {
  getShoppingCart,
  addProductToCart,
  removeProductFromCart
} from './shopping-cart-functions'
export class Cart extends React.Component {
  render() {
    const testProduct = {
      id: 1,
      name: 'pup-ceratops',
      price: '39.99',
      imageUrl:
        'https://www.awesomeinventions.com/wp-content/uploads/2015/05/dog-dino.jpg',
      qty: 3
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
          <div id="shopping-cart-order-summary-list">
            <ul>
              <li>Subtotal: $50.00</li>
              <li>Shipping: $5.00</li>
              <li>Tax: $0.00</li>
              <li>Total: $55.00</li>
            </ul>
          </div>
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
      <select name="qty" id="qty" value={item.qty}>
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
}
