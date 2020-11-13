import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchAllOrders} from '../store/orders'

/**
 * COMPONENT
 */
export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    console.log(this.props.admin)
    const user = this.props.user
    const orderArr = this.props.order.orders
    const thisUsersOrder = orderArr.filter(order => {
      return order.userId === user.id
    })
    console.log(thisUsersOrder[0])
    return (
      <div>
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
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.user,
    order: state.ordersReducer,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllOrders: () => dispatch(fetchAllOrders())
  }
}
export default connect(mapState, mapDispatch)(OrderHistory)

/**
 * PROP TYPES
 */
OrderHistory.propTypes = {
  email: PropTypes.string
}
