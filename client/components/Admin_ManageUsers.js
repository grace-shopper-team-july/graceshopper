import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/user'

export class AdminManageUsers extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  toggleStatus() {}

  render() {
    console.log(this.props)
    const userArr = this.props.user.allUsers
    //   console.log(userArr)
    // console.log(thisUsersOrder[0])
    return (
      <div>
        <h2>Manage Users</h2>

        {userArr && userArr.length > 0 ? (
          userArr.map(user => {
            return (
              <div key={user.id}>
                <p>User Id: {user.id}</p>
                <p>User First Name: {user.firstName}</p>
                <p>User Last Name: {user.lastName}</p>
                <p>User Email: {user.email}</p>
                <p>Admin Status: {user.admin.toString()}</p>
                <label>
                  <small>Toggle Admin Status:</small>
                </label>
                <select>
                  <option>True</option>
                  <option>False</option>
                </select>
              </div>
            )
          })
        ) : (
          <div />
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    order: state.ordersReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

const connectedAdminManageUsers = connect(mapState, mapDispatch)(
  AdminManageUsers
)
export default connectedAdminManageUsers
/**
 * PROP TYPES
 */
AdminManageUsers.propTypes = {
  email: PropTypes.string
}
