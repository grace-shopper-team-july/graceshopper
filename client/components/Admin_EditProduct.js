import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchSingleProduct, editSingleProduct} from '../store/singleProduct'

class EditSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: undefined,
      imageUrl: undefined,
      description: undefined,
      qoh: undefined,
      price: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(id) {
    return evt => {
      evt.preventDefault()
      const name = this.state.name
      const imageUrl = this.state.imageUrl
      const description = this.state.description
      const qoh = this.state.qoh
      const price = this.state.price
      this.props.editSingleProduct(id, {
        name,
        imageUrl,
        description,
        qoh,
        price
      })
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
                <input
                  name="name"
                  type="text"
                  value={this.state.name || this.props.singleProduct.name}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="imageUrl">
                  <small> Product Image URL:</small>
                </label>
                <input
                  name="imageUrl"
                  type="url"
                  value={
                    this.state.imageUrl || this.props.singleProduct.imageUrl
                  }
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="description">
                  <small> Product Description:</small>
                </label>
                <input
                  name="description"
                  type="text"
                  value={
                    this.state.description ||
                    this.props.singleProduct.description
                  }
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="qoh">
                  <small> Product Quantity:</small>
                </label>
                <input
                  name="qoh"
                  type="text"
                  value={this.state.qoh || this.props.singleProduct.qoh}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="price">
                  <small> Price:</small>
                </label>
                <input
                  name="price"
                  type="text"
                  value={this.state.price || this.props.singleProduct.price}
                  onChange={this.handleChange}
                />
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
