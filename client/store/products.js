import axios from 'axios'
import {act} from 'react-test-renderer'

const SET_PRODUCTS = 'SET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeProduct = id => {
  return async dispatch => {
    try {
      const deleted = await axios.delete(`/api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const postProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addProduct(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

const initialState = {
  products: []
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    case DELETE_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products.filter(product => {
            return product.id !== action.id
          })
        ]
      }
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    default:
      return state
  }
}
