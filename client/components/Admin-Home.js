import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './index'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchAllOrders, fetchSingleOrders} from '../store/orders'
import {fetchAllUsers} from '../store/user'

/**
 * COMPONENT
 */
export class AdminHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllOrders()
    this.props.fetchAllUsers()
  }

  render() {
    console.log(this.props)
    const user = this.props.user.user
    const orderArr = this.props.order.orders
    const thisUsersOrder = orderArr.filter(order => {
      return order.userId === user.id
    })
    const userArr = this.props.user.allUsers
    console.log(userArr)
    // console.log(thisUsersOrder[0])
    return (
      <div>
        <div>
          <h1>Welcome, {`${user.firstName} ${user.lastName}!`}</h1>
          <h4>{user.email}</h4>
        </div>
        <div>
          <h2>Orders</h2>
          {thisUsersOrder && thisUsersOrder.length > 0 ? (
            thisUsersOrder.map(order => {
              return (
                <div key={order.id}>
                  <Link to={`/home/orders/${order.id}`}>
                    <h4>Order Number: {order.id}</h4>
                  </Link>
                  <h4>Payment Type: {order.payment}</h4>
                  <h4>Order Total:{order.total}</h4>
                </div>
              )
            })
          ) : (
            <div>
              <h4>...No Orders Placed Yet...</h4>
            </div>
          )}
        </div>
        <div>
          <h2>Manage Users</h2>

          {userArr && userArr.length > 0 ? (
            userArr.map(user => {
              return (
                <div key={user.id}>
                  <p>User Id:{user.id}</p>
                  <p>User First Name:{user.firstName}</p>
                  <p>User Last Name:{user.lastName}</p>
                  <p>User Email:{user.email}</p>
                  <p>Admin Status:{user.admin}</p>
                </div>
              )
            })
          ) : (
            <div />
          )}
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
    user: state.user,
    order: state.ordersReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    fetchSingleOrders: id => dispatch(fetchSingleOrders(id)),
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
