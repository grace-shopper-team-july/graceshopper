import React from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../store/products'

const AddProduct = props => {
  return (
    <div className="newProducts">
      <h3>Add A New Product</h3>
      <div className="userUpdateForm">
        <form onSubmit={props.handleSubmit}>
          <div>
            <label htmlFor="name">
              <small>Name: </small>
            </label>
            <input name="name" type="text" />
          </div>
          <div>
            <label htmlFor="description">
              <small>Description: </small>
            </label>
            <input name="description" type="text" />
          </div>
          <div>
            <label htmlFor="price">
              <small>Price: </small>
            </label>
            <input name="price" type="text" />
          </div>
          <div>
            <label htmlFor="imageUrl">
              <small>Image: </small>
            </label>
            <input name="imageUrl" type="url" />
          </div>
          <div>
            <label htmlFor="qoh">
              <small>Quantity: </small>
            </label>
            <input name="qoh" type="text" />
          </div>
          <div>
            <label htmlFor="species">
              <small>Species: </small>
            </label>
            <input name="species" type="text" />
          </div>
          <div>
            <label htmlFor="category">
              <small>Category: </small>
            </label>
            <input name="category" type="text" />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    postProduct: product => dispatch(postProduct(product)),
    handleSubmit(evt) {
      evt.preventDefault()
      const name = evt.target.name.value
      const description = evt.target.description.value
      const price = evt.target.price.value
      const imageUrl = evt.target.imageUrl.value
      const qoh = evt.target.qoh.value
      const species = evt.target.species.value
      const category = evt.target.category.value
      dispatch(
        postProduct({
          name,
          description,
          price,
          imageUrl,
          qoh,
          species,
          category
        })
      )
      evt.target.reset()
    }
  }
}

export default connect(null, mapDispatch)(AddProduct)
