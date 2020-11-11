import axios from 'axios'

//Action Types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//Action Creators
const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

//Thunk
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

//Initial State
const initialState = {
  singleProduct: {}
}

//Reducer
const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}

export default singleProductReducer
