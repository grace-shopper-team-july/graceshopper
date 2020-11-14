import axios from 'axios'
import {act} from 'react-test-renderer'

const GET_USER_CART = 'GET_USER_CART'

const getUserCart = cart => {
  return {
    type: GET_USER_CART,
    cart
  }
}

export const fetchUserCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${id}`)
      dispatch(getUserCart(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

const initialState = {
  currentCart: []
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CART:
      return {...state, currentCart: action.cart}
    default:
      return state
  }
}

export default checkoutReducer
