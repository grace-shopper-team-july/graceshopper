import {
  getShoppingCart,
  removeProductFromCart
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
    try {
      const cart = getShoppingCart()
      dispatch(setCart(cart))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeItem = id => {
  return dispatch => {
    try {
      const cart = removeProductFromCart(id)
      dispatch(setCart(cart))
    } catch (err) {
      console.error(err)
    }
  }
}

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
