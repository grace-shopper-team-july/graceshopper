import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, selectProductQty} from '../store/singleProduct'
import {fetchCart, addItem} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    this.props.fetchCart()
  }

  render() {
    const product = this.props.singleProduct
    const quantityArray = []
    for (let i = 1; i <= product.qoh; i++) {
      quantityArray.push(i)
    }
    //console.log(product)
    return (
      <div>
        {product ? (
          <div>
            <h1>{product.name}</h1>
            <img src={product.imageUrl} />
            <p>{product.description}</p>
            <label htmlFor="quantity">Quantity</label>
            <select onChange={evt => this.handleChange(evt)}>
              {quantityArray ? (
                quantityArray.map((num, idx) => {
                  return <option key={idx}>{num}</option>
                })
              ) : (
                <div />
              )}
            </select>
            <button type="button" onClick={() => this.handleClick(product)}>
              ADD TO CART
            </button>
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
    orderId: state.cartReducer.orderId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    fetchCart: () => dispatch(fetchCart()),
    selectProductQty: qty => dispatch(selectProductQty(qty)),
    addItem: (product, orderId) => dispatch(addItem(product, orderId))
  }
}

const connectedSingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)
export default connectedSingleProduct
