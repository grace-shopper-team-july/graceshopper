import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './index'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchAllOrders, fetchSingleOrders} from '../store/orders'

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
    const orderArr = this.props.order.orders
    const thisUsersOrder = orderArr.filter(order => {
      return order.userId === user.id
    })
    console.log(thisUsersOrder[0])
    return (
      <div>
        <div>
          <h1>Welcome, {`${user.firstName} ${user.lastName}!`}</h1>
          <h4>{user.email}</h4>
        </div>
        <div>
          <h2>Orders</h2>
          {thisUsersOrder ? (
            thisUsersOrder.map(order => {
              return (
                <div key={order.id}>
                  <h4>Order Number: {order.id}</h4>
                  <h4>Payment Type: {order.payment}</h4>
                  <h4>Order Total:{order.total}</h4>
                </div>
              )
            })
          ) : (
            <div>...No Orders Placed Yet...</div>
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
    fetchSingleOrders: id => dispatch(fetchSingleOrders(id))
  }
}
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
