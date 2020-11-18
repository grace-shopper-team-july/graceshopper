import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchProducts, removeProduct} from '../store/products'
import AddProduct from './Admin_PostProduct'

class ManageProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleClick(id) {
    this.props.removeProduct(id)
  }

  render() {
    const productsArr = this.props.products
    productsArr.sort((a, b) => a.id - b.id)
    return (
      <div className="manage">
        <div className="add">
          <AddProduct />
        </div>
        <div className="manageProducts">
          <h3>Manage Existing Products</h3>
          {productsArr && productsArr.length > 0 ? (
            productsArr.map(product => {
              return (
                <div className="each" key={product.id}>
                  <h4>Product Id: {product.id}</h4>
                  <h4>Product Name: {product.name}</h4>
                  <Link to={`/home/edit/${product.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => this.handleClick(product.id)}>
                    Remove
                  </button>
                </div>
              )
            })
          ) : (
            <div>...Loading...</div>
          )}
        </div>
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
    fetchProducts: () => dispatch(fetchProducts()),
    removeProduct: id => dispatch(removeProduct(id))
  }
}

export default connect(mapState, mapDispatch)(ManageProducts)
