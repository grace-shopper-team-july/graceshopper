import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders, fetchSingleOrders} from '../store/orders'

class OrderDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSingleOrders(this.props.match.params.orderId)
  }

  render() {
    console.log(this.props.order)
    const order = this.props.order
    const productsArr = this.props.order.products
    return (
      <div>
        <div>
          <h1>Order Details </h1>
          <p>Order#: {order.id}</p>
          <p>Date Purchased: {order.date}</p>
          <p>Payment Type: {order.payment}</p>
          <p>Order Total: {order.total}</p>
        </div>
        <div>
          <h3>Product Details</h3>
          {productsArr && productsArr.length > 0 ? (
            productsArr.map(product => {
              console.log(product)
              return (
                <div key={product.id}>
                  <h4>Product Name: {product.name}</h4>
                  <img src={product.imageUrl} />
                  <p>Purchase Price: {product.orderLineItem.price}</p>
                  <p>Quantity Purchased: {product.orderLineItem.quantity}</p>
                  <p>Product Description:{product.description}</p>
                </div>
              )
            })
          ) : (
            <div>No Details :(( </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.ordersReducer.singleOrder
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleOrders: id => dispatch(fetchSingleOrders(id))
  }
}
const connectedOrderDetails = connect(mapState, mapDispatch)(OrderDetails)
export default connectedOrderDetails
