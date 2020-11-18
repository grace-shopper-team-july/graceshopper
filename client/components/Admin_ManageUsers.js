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
      <div className="ordzz">
        <div className="ordTitle">
          <h2>Manage Users</h2>
        </div>
        {userArr && userArr.length > 0 ? (
          userArr.map(user => {
            return (
              <div className="orderHistory" key={user.id}>
                <div className="orders">
                  <p>Id: {user.id}</p>
                </div>
                <div className="orders">
                  <p>First Name: {user.firstName}</p>
                </div>
                <div className="orders">
                  <p>Last Name: {user.lastName}</p>
                </div>
                <div className="orders">
                  <p>Email: {user.email}</p>
                </div>
                <div className="orders">
                  <p>Admin Status: {user.admin.toString()}</p>
                </div>

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
