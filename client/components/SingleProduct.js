import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCampus} from '../store/singleProduct'

const SingleProduct = props => {
  return <div>This is the single product page!</div>
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleCampus: id => dispatch(fetchSingleCampus(id))
  }
}

const connectedSingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)
export default connectedSingleProduct
