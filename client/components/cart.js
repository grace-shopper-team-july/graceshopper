import React from 'react'

function getShoppingCart() {
  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    setShoppingCart([])
    return []
  }
}

function setShoppingCart(products) {
  localStorage.setItem('cart', JSON.stringify(products))
}

function updateShoppingCart(cartUpdateFunction) {
  let newCart = cartUpdateFunction(getShoppingCart())
  setShoppingCart(newCart)
  return newCart
}

function addProductToCart(product) {
  updateShoppingCart(cart => {
    cart.push(product)
    return cart
  })
}

export class Cart extends React.Component {
  componentDidMount() {
    getShoppingCart()
  }
  render() {
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
          {this.renderShoppingCart()}
        </div>
        <div id="shopping-cart-right">
          <div id="shopping-cart-order-summary-title">
            <h6>Order Summary</h6>
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
        <button type="button" onClick={addProductToCart}>
          Add To Cart
        </button>
      </div>
    )
  }

  renderShoppingCart() {
    return (
      <div id="cart-item">
        <div id="cart-item-left">
          <div id="cart-item-image">image here</div>
        </div>
        <div id="cart-item-right">
          <div id="cart-item-attributes">attributes here</div>
          <div id="cart-item-price">$10.00</div>
          <div id="cart-item-quantity">dropdown here</div>
          <div id="cart-item-total-price">$20.00</div>
          <div id="cart-item-remove">Remove</div>
        </div>
        <hr />
      </div>
    )
  }
}
