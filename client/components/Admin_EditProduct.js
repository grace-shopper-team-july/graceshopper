import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchSingleProduct, editSingleProduct} from '../store/singleProduct'

class EditSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  // try using the || for assignment to clean this up.
  // pseudocode example:
  // evt.target = evt.target || this.props

  // better yet - what if we made this a controlled form and set values in the constructor?

  handleSubmit(id) {
    return evt => {
      evt.preventDefault()
      const name =
        evt.target.name.value === ''
          ? this.props.singleProduct.name
          : evt.target.name.value
      const imageUrl =
        evt.target.imageUrl.value === ''
          ? this.props.singleProduct.imageUrl
          : evt.target.imageUrl.value
      const description =
        evt.target.description.value === ''
          ? this.props.singleProduct.description
          : evt.target.description.value
      const qoh =
        evt.target.qoh.value === ''
          ? this.props.singleProduct.qoh
          : evt.target.qoh.value
      const price =
        evt.target.price.value === ''
          ? this.props.singleProduct.price
          : evt.target.price.value
      this.props.editSingleProduct(id, {
        name,
        imageUrl,
        description,
        qoh,
        price
      })
      evt.target.reset()
    }
  }

  render() {
    const product = this.props.singleProduct

    return (
      <div>
        <div>
          {product ? (
            <div>
              <h1>Product: {product.name}</h1>
              <img src={product.imageUrl} />
              <p>Description: {product.description}</p>
              <p>Quantity On Hand: {product.qoh}</p>
              <p>Price: {product.price}</p>
            </div>
          ) : (
            <div />
          )}
          <div>
            <h3>Update Product Info:</h3>
            <form onSubmit={this.handleSubmit(product.id)}>
              <div>
                <label htmlFor="name">
                  <small>Product Name:</small>
                </label>
                <input name="name" type="text" />
              </div>
              <div>
                <label htmlFor="imageUrl">
                  <small> Product Image URL:</small>
                </label>
                <input name="imageUrl" type="url" />
              </div>
              <div>
                <label htmlFor="description">
                  <small> Product Description:</small>
                </label>
                <input name="description" type="text" />
              </div>
              <div>
                <label htmlFor="qoh">
                  <small> Product Quantity:</small>
                </label>
                <input name="qoh" type="text" />
              </div>
              <div>
                <label htmlFor="price">
                  <small> Price:</small>
                </label>
                <input name="price" type="text" />
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
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
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    editSingleProduct: (id, productInfo) =>
      dispatch(editSingleProduct(id, productInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSingleProduct)
