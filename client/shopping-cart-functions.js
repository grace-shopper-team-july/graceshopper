export function getShoppingCart() {
  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    setShoppingCart([])
    return []
  }
}

export function setShoppingCart(products) {
  localStorage.setItem('cart', JSON.stringify(products))
}

export function updateShoppingCart(cartUpdateFunction) {
  let newCart = cartUpdateFunction(getShoppingCart())
  setShoppingCart(newCart)
  return newCart
}

export function addProductToCart(product, qty) {
  updateShoppingCart(cart => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        cart[i].qty += qty
        return cart
      }
    }
    cart.push(product)
    return cart
  })
}

export function removeProductFromCart(productId) {
  updateShoppingCart(cart => {
    return cart.filter(item => {
      return item.id !== productId
    })
  })
}

export function updateProductQty(productId, qty) {
  updateShoppingCart(cart => {
    return cart.map(item => {
      if (item.id === productId) {
        item.qty = qty
      }
      return item
    })
  })
}
