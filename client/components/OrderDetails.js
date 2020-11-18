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
    const order = this.props.order
    const productsArr = this.props.order.products
    return (
      <div className="orderPage">
        <div>
          <h1>Order Details </h1>
          <p>Order#: {order.id}</p>
          <p>Date Purchased: {order.date}</p>
          <p>Payment Type: {order.payment}</p>
          <p>Order Total: {order.total}</p>
        </div>
        <div className="orderBox">
          <h2>Product Details</h2>
          {productsArr && productsArr.length > 0 ? (
            productsArr.map(product => {
              return (
                <div className="historyDetails" key={product.id}>
                  <div className="product-detail-img">
                    <img src={product.imageUrl} />
                  </div>
                  <div div className="product-detail-desc">
                    <h4>Product Name: {product.name}</h4>
                    <p>Purchase Price: {product.orderLineItem.price}</p>
                    <p>Quantity Purchased: {product.orderLineItem.quantity}</p>
                    <p>Product Description:{product.description}</p>
                  </div>
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
