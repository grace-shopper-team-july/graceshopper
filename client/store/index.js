import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProduct from './singleProduct'
import productsReducer from './products'
import cartReducer from './cart'
import ordersReducer from './orders'

const reducer = combineReducers({
  user,
  productsReducer,
  singleProduct,
  cartReducer,
  ordersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
