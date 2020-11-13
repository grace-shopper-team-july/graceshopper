import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './index'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchAllOrders} from '../store/orders'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const user = this.props.user

    return (
      <div>
        <div>
          <h1>Welcome, {`${user.firstName} ${user.lastName}!`}</h1>
          <h4>{user.email}</h4>
        </div>
        <div>
          <h3>User Portal Options</h3>
          <Link to="/home/edit_account">
            <button>Edit Your Account</button>
          </Link>
          <Link to="home/orders">
            <button>Order History</button>
          </Link>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllOrders: () => dispatch(fetchAllOrders())
  }
}
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
