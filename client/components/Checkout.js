import React from 'react'
import {connect} from 'react-redux'
import {fetchUserCart} from '../store/checkout'
import {fetchAllUsers} from '../store/user'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserCart(this.props.user.user.id)
  }

  render() {
    console.log(this.props.user.user.id)
    return <div>This is the Checkout Page</div>
  }
}

const mapState = state => {
  return {
    user: state.user,
    currentCart: state.checkoutReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchUserCart: id => dispatch(fetchUserCart(id))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
