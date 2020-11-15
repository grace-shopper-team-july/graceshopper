import React from 'react'
import {connect} from 'react-redux'

import {fetchAllUsers} from '../store/user'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Your Order Has Been Confirmed!</h1>
        <h5>Thank you for your purchase :)</h5>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    orderId: state.cartReducer.orderId,
    cart: state.cartReducer.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
