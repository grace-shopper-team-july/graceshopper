import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './index'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const user = props.user

  return (
    <div>
      <h3>Welcome, {`${user.firstName} ${user.lastName}!`}</h3>
      <h4>{user.email}</h4>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
