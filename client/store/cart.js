import {getShoppingCart} from '../shopping-cart-functions'

//Action Types
const GET_CART = 'GET_CART'

//Action Creators
const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

//Thunk
export const fetchCart = () => {
  return dispatch => {
    try {
      const cart = getShoppingCart()
      dispatch(getCart(cart))
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
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
