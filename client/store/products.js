import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      console.log('fetching products')
      // console.log(data)
      dispatch(setProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  products: []
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      console.log('in products reducer')
      return {...state, products: action.products}
    default:
      return state
  }
}
