import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchAllUsers} from '../store/user'
import {fetchActiveCartOrder} from '../store/cart'
/**
 * COMPONENT
 */
export class AdminHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllUsers()
    this.props.fetchActiveCartOrder(this.props.user.user.id)
  }

  render() {
    const user = this.props.user.user

    return (
      <div className="adminWelcome">
        <div className="welcome">
          <h1>Welcome, {`${user.firstName} ${user.lastName}!`}</h1>
          {/* <h4>{user.email}</h4> */}
        </div>

        <div className="adminPortal">
          <h4>Admin Portal Options</h4>
        </div>
        <div className="adminPortalBtns">
          <Link to="/home/edit_account">
            <button>Edit Your Account</button>
          </Link>

          <Link to="/home/manageusers">
            <button>Manage Users</button>
          </Link>

          <Link to="/home/orders">
            <button>Order History</button>
          </Link>

          <Link to="/home/manageproducts">
            <button>Manage Products</button>
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchActiveCartOrder: userId => dispatch(fetchActiveCartOrder(userId))
  }
}
export default connect(mapState, mapDispatch)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  email: PropTypes.string
}
