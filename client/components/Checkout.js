import React from 'react'
import {connect} from 'react-redux'

import {fetchAllUsers} from '../store/user'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="checkout">
        <div className="innerCheckout">
          <h1>Your Order Has Been Confirmed!</h1>
          <iframe
            src="https://giphy.com/embed/Yb8ebQV8Ua2Y0"
            width="480"
            height="221"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          />
          <p>
            <a href="https://giphy.com/gifs/steve-carell-cute-the-office-Yb8ebQV8Ua2Y0" />
          </p>
          <h5>Thank you for your purchase :)</h5>
        </div>
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
