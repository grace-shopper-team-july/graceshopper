import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchProducts} from '../store/products'
//import SingleProduct component here after merge is done

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    //bind function to this?
  }

  componentDidMount() {
    console.log('in compDidMount')
    console.log(this.props.fetchProdFunc())
    this.props.fetchProdFunc()
  }

  render() {
    console.log(this.props.products)
    console.log(this.props.products.products)
    let products = this.props.products.products
    return (
      <div>
        <h1>All Products View</h1>

        <div id="productsBox">
          {products ? (
            products.map(product => {
              console.log(product)
              return (
                <div key={product.id}>
                  <h3>{product.name}</h3>
                  <img src={product.imageUrl} />
                  <h4>{product.price}</h4>
                  <Link to={`/${product.id}`}>View Product Details</Link>
                </div>
              )
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => (
  console.log(state),
  {
    products: state.productsReducer
  }
)

const mapDispatch = {
  fetchProdFunc: fetchProducts
}

export default connect(mapState, mapDispatch)(AllProducts)
