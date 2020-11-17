import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllUsers, editUser} from '../store/user'

export class AdminManageUsers extends React.Component {
  constructor(props) {
    super(props)
    this.toggleStatus = this.toggleStatus.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  toggleStatus(user) {
    let admin = false
    if (user.admin === true) {
      this.props.updateAdmin(user.id, {admin})
    } else {
      admin = true
      this.props.updateAdmin(user.id, {admin})
    }
    //this.props.fetchAllUsers()
  }

  render() {
    const userArr = this.props.user.allUsers
    userArr.sort((a, b) => a.id - b.id)
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

                <button onClick={() => this.toggleStatus(user)}>
                  Toggle Admin Status
                </button>
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
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    updateAdmin: (id, adminStatus) => dispatch(editUser(id, adminStatus))
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
