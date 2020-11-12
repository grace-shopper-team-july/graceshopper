import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    //console.log(this.props)
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
            <select>
              {quantityArray ? (
                quantityArray.map(num => {
                  return <option>{num}</option>
                })
              ) : (
                <div />
              )}
            </select>
            <button>ADD TO CART</button>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

const connectedSingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)
export default connectedSingleProduct
