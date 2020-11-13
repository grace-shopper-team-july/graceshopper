import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchAllUsers} from '../store/user'

/**
 * COMPONENT
 */
export class AdminHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    const user = this.props.user.user

    return (
      <div>
        <div>
          <h1>Welcome, {`${user.firstName} ${user.lastName}!`}</h1>
          <h4>{user.email}</h4>
        </div>

        <div>
          <h2>Admin Portal Options</h2>
          <Link to="/home/manageusers">
            <button>Manage Users</button>
          </Link>
          <Link to="/home/orders">
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}
export default connect(mapState, mapDispatch)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  email: PropTypes.string
}
