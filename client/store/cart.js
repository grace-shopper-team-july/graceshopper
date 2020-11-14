import {
  getShoppingCart,
  removeProductFromCart,
  addProductToCart,
  updateProductQty
} from '../shopping-cart-functions'

//Action Types
const SET_CART = 'SET_CART'

//Action Creators
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

//Thunk
export const fetchCart = () => {
  return dispatch => {
    const cart = getShoppingCart()
    dispatch(setCart(cart))
  }
}

export const removeItem = id => {
  return dispatch => {
    const cart = removeProductFromCart(id)
    dispatch(setCart(cart))
  }
}

export const addItem = item => {
  return dispatch => {
    const cart = addProductToCart(item, item.qty)
    dispatch(setCart(cart))
  }
}

export const updateItemQty = (item, qty) => {
  return dispatch => {
    const cart = updateProductQty(item, qty)
    dispatch(setCart(cart))
  }
}

// Experiment with this later?
/*export const setThunkFactory = (cartFunction) => {
  return (...params) => {
    return dispatch => {
      const cart = cartFunction.apply(null, params)
      dispatch(setCart(cart))
    }
  }
}

export const newAddItem = setThunkFactory(addProductToCart)
export const newRemoveItem = setThunkFactory(removeProductFromCart)
export const newFetchCart = setThunkFactory(getShoppingCart)
*/

//Initial State
const initialState = {
  cart: []
}

//Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
