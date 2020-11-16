import axios from 'axios'
import {
  setShoppingCart,
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

const getActiveCartOrder = (order, orderId) => {
  return {
    type: GET_ACTIVE_CART_ORDER,
    order,
    orderId
  }
}

//Thunk
export const fetchCart = () => {
  return dispatch => {
    const cart = getShoppingCart()
    dispatch(setCart(cart))
  }
}

export const removeItem = (id, orderId) => {
  return dispatch => {
    const cart = removeProductFromCart(id)
    saveCartToDB(cart, orderId)
    dispatch(setCart(cart))
  }
}

export const addItem = (item, orderId) => {
  return dispatch => {
    const cart = addProductToCart(item, item.qty)
    saveCartToDB(cart, orderId)
    dispatch(setCart(cart))
  }
}

export const updateItemQty = (item, qty, orderId) => {
  return dispatch => {
    const cart = updateProductQty(item, qty)
    saveCartToDB(cart, orderId)
    dispatch(setCart(cart))
  }
}

export const fetchActiveCartOrder = userId => {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/orders/cart/${userId}`)
      console.log('this isssssbejf j ve lv  ', data)
      let lineItems = data.products.map(prd => {
        return {
          id: prd.id,
          imageUrl: prd.imageUrl,
          name: prd.name,
          price: prd.orderLineItem.price,
          qty: prd.orderLineItem.quantity
        }
      })
      console.log('lineItems', lineItems)
      setShoppingCart(lineItems)
      dispatch(getActiveCartOrder(lineItems, data.id))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const saveCartToDB = async (cart, orderId) => {
  try {
    if (orderId > 0) {
      console.log('SAVE CART TO DBBBBBBBBB!!!!!!')
      const deleted = await axios.delete(`/api/orders/orderItem/${orderId}`)

      for (let i = 0; i < cart.length; i++) {
        let prd = cart[i]
        let orderItem = {
          productId: prd.id,
          orderId: orderId,
          quantity: prd.qty,
          price: prd.price
        }
        await axios.post(`/api/orders/orderItem`, orderItem)
      }

      let total = cart.reduce((accum, product) => {
        return accum + product.qty * product.price
      }, 0)

      await axios.put(`/api/orders/${orderId}`, {total: total})
    }
  } catch (err) {
    console.error(err)
  }
}

export const editOrderStatus = id => {
  return async dispatch => {
    console.log('editOd')
    try {
      const {data} = await axios.put(`/api/orders/${id}`, {active: false})
      setShoppingCart([])
      const cart = getShoppingCart()
      dispatch(setCart(cart))
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
      return {...state, orderId: action.orderId, cart: action.order}
    default:
      return state
  }
}
