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

export function addProductToCart(product, qty) {
  let newCart = getShoppingCart()
  for (let i = 0; i < newCart.length; i++) {
    if (newCart[i].id === product.id) {
      newCart[i].qty += qty
      setShoppingCart(newCart)
      return newCart
    }
  }
  newCart.push(product)
  setShoppingCart(newCart)
  return newCart
}

export function removeProductFromCart(productId) {
  let newCart = getShoppingCart().filter(item => {
    return item.id !== productId
  })
  setShoppingCart(newCart)
  return getShoppingCart()
}

export function updateProductQty(productId, qty) {
  let newCart = getShoppingCart().map(item => {
    if (item.id === productId) {
      item.qty = qty
    }
    return item
  })
  setShoppingCart(newCart)
  return newCart
}
