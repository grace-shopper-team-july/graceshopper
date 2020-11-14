import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class ManageProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    console.log(this.props)
    const productsArr = this.props.products
    productsArr.sort((a, b) => a.id - b.id)
    return (
      <div>
        {productsArr && productsArr.length > 0 ? (
          productsArr.map(product => {
            return (
              <div key={product.id}>
                <h4>Product Id: {product.id}</h4>
                <h4>Product Name: {product.name}</h4>
                <button>Edit</button>
                <button>Remove</button>
              </div>
            )
          })
        ) : (
          <div>...Loading...</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.productsReducer.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(ManageProducts)
