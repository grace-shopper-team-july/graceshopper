import axios from 'axios'

//Action Types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT'
const UPDATE_PRODUCT_QTY = 'UPDATE_PRODUCT_QTY'
const ADDED_PRODUCT_TO_CART = 'ADDED_PRODUCT_TO_CART'

//Action Creators
const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

const updateSingleProduct = product => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
    product
  }
}

const updateProductQty = qty => {
  return {
    type: UPDATE_PRODUCT_QTY,
    qty
  }
}

const displayAddedToCart = () => {
  return {
    type: ADDED_PRODUCT_TO_CART
  }
}

//Thunk
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const editSingleProduct = (id, productInfo) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${id}`, productInfo)
      dispatch(updateSingleProduct(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const selectProductQty = qty => {
  if (qty <= 0) {
    qty = 1
  }
  return dispatch => {
    dispatch(updateProductQty(qty))
  }
}

export const displayAddedItem = () => {
  return dispatch => {
    dispatch(displayAddedToCart())
  }
}

//Initial State
const initialState = {
  singleProduct: {},
  productQtySelected: 1,
  displayAddedToCart: false
}

//Reducer
const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case UPDATE_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case UPDATE_PRODUCT_QTY:
      return {...state, productQtySelected: action.qty}
    case ADDED_PRODUCT_TO_CART:
      return {...state, displayAddedToCart: !state.displayAddedToCart}
    default:
      return state
  }
}

export default singleProductReducer
