import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleProduct,
  selectProductQty,
  displayAddedItem
} from '../store/singleProduct'
import {fetchCart, addItem} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    this.props.fetchCart()
    this.props.selectProductQty(1)
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div className="main-content">
        {product ? (
          <div className="product-detail">
            <div className="product-detail-img">
              <img src={product.imageUrl} />
            </div>
            <div className="product-detail-desc">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <label htmlFor="quantity">
                <h4>Quantity:</h4>
              </label>
              <div className="product-quantity-and-notification">
                <input
                  type="number"
                  value={this.props.productQtySelected}
                  onChange={evt => this.handleChange(evt)}
                />
                {this.props.displayAddedToCart ? (
                  <div className="product-added-to-cart">Added to cart!</div>
                ) : (
                  <div />
                )}
              </div>
              <br />
              <button
                type="button"
                className="button"
                onClick={() => this.handleClick(product)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }

  generateCartItemObj(product, qty) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      qty: qty
    }
  }

  handleChange(evt) {
    let qtyNum = parseInt(evt.target.value)
    this.props.selectProductQty(qtyNum)
  }

  handleClick(product) {
    let qty = this.props.productQtySelected
    this.props.displayAddedItem()
    setTimeout(this.props.displayAddedItem, 6000)
    this.props.addItem(
      this.generateCartItemObj(product, qty),
      this.props.orderId
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct.singleProduct,
    cart: state.cartReducer.cart,
    productQtySelected: state.singleProduct.productQtySelected,
    displayAddedToCart: state.singleProduct.displayAddedToCart,
    orderId: state.cartReducer.orderId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    fetchCart: () => dispatch(fetchCart()),
    selectProductQty: qty => dispatch(selectProductQty(qty)),
    displayAddedItem: () => dispatch(displayAddedItem()),
    addItem: (product, orderId) => dispatch(addItem(product, orderId))
  }
}

const connectedSingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)
export default connectedSingleProduct
