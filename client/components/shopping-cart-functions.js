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

export function addProductToCart(product) {
  updateShoppingCart(cart => {
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
