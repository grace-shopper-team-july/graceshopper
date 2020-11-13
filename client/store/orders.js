import axios from 'axios'

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

const getAllOrders = orders => {
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}

const getSingleOrder = order => {
  return {
    type: GET_SINGLE_ORDER,
    order
  }
}

export const fetchAllOrders = orders => {
  return async dispatch => {
    try {
      let allOrders = await axios.get('/api/orders')
      dispatch(getAllOrders(allOrders))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchSingleOrders = orderId => {
  return async dispatch => {
    try {
      let singleOrder = await axios.get(`/api/orders/${orderId}`)
      dispatch(getSingleOrder(singleOrder))
    } catch (err) {
      console.error(err)
    }
  }
}

const initalState = {
  orders: [],
  singleOrder: {}
}

const ordersReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {...state, orders: action.orders}
    case GET_SINGLE_ORDER:
      return {...state, singleOrder: action.singleOrder}
    default:
      return state
  }
}

export default ordersReducer
