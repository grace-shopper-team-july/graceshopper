import axios from 'axios'
import {
  getShoppingCart,
  removeProductFromCart,
  addProductToCart,
  updateProductQty
} from '../shopping-cart-functions'

//Action Types
const SET_CART = 'SET_CART'
const GET_ACTIVE_CART_ORDER = 'GET_ACTIVE_CART_ORDER'

//Action Creators
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

const getActiveCartOrder = order => {
  return {
    type: GET_ACTIVE_CART_ORDER,
    order
  }
}

//Thunk
export const fetchCart = () => {
  return dispatch => {
    console.log('EMPTY CART GET IT FROM LOCAL STORAGE')
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

export const fetchActiveCartOrder = userId => {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/orders')
      let active = data.filter(order => {
        return order.active === true && order.userId === userId
      })[0]
      if (active.length === 0) {
        const {data} = await axios.post(`/api/orders`, userId)
        active = data
      }
      const order = await axios.get(`/api/orders/${active.id}`)
      console.log('ACTIVE ORDER', order.data)
      dispatch(getActiveCartOrder(order.data))
    } catch (err) {
      console.error(err.message)
    }
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
  cart: [],
  orderId: 0
}

//Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, cart: action.cart}
    case GET_ACTIVE_CART_ORDER:
      let lineItems = action.order.products.map(prd => {
        return {
          id: prd.id,
          imageUrl: prd.imageUrl,
          name: prd.name,
          price: prd.orderLineItem.price,
          qty: prd.orderLineItem.quantity
        }
      })
      return {...state, orderId: action.order, cart: lineItems}
    default:
      return state
  }
}
