import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchProducts} from '../store/products'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currFilters: [],
      filterList: [
        //species
        {value: 'DOG'},
        {value: 'CAT'},
        {value: 'HEDGEHOG'},
        {value: 'REPTILE'},
        {value: 'FERRET'},
        //clothing category
        {value: 'FORMAL'},
        {value: 'HOLIDAY'},
        {value: 'WEATHERWEAR'},
        {value: 'COSTUME'},
        {value: 'ACCESSORIES'},
        {value: 'EVERYDAY'}
      ],
      itemList: []
    }
    this.filteringProd = this.filteringProd.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.products.products !== state.itemList) {
      return {
        ...state,
        itemList: props.products.products
      }
    }
    return null
  }

  componentDidMount() {
    this.props.fetchProdFunc()
  }

  onFilterChange(filter) {
    if (filter === 'ALL') {
      if (this.state.currFilters.length === this.state.filterList.length) {
        this.setState({currFilters: []})
      } else {
        let newCurrFilters = this.state.filterList.map(filt => filt.value)
        this.setState({currFilters: newCurrFilters})
      }
    } else if (this.state.currFilters.includes(filter)) {
      const filtIdx = this.state.currFilters.indexOf(filter)
      const newFilt = [...this.state.currFilters]
      newFilt.splice(filtIdx, 1)
      this.setState({currFilters: newFilt})
    } else {
      this.setState({currFilters: [...this.state.currFilters, filter]})
    }
  }

  filteringProd(currFilters, filterList, itemList) {
    let filteredProducts = []
    if (currFilters.length === 0 || currFilters.length === filterList) {
      filteredProducts = itemList
    } else {
      let lowCurrFilters = currFilters.map(currFilt => {
        return currFilt.toLowerCase()
      })
      let products = [...itemList]
      for (let i = 0; i < products.length; i++) {
        if (lowCurrFilters.length === 1) {
          if (lowCurrFilters.includes(itemList[i].species)) {
            filteredProducts.push(itemList[i])
          }
          if (lowCurrFilters.includes(itemList[i].category)) {
            filteredProducts.push(itemList[i])
          }
        } else if (lowCurrFilters.length > 1) {
          if (
            lowCurrFilters.includes(itemList[i].species) &&
            lowCurrFilters.includes(itemList[i].category)
          ) {
            filteredProducts.push(itemList[i])
          } else if (
            !lowCurrFilters.includes(itemList[i].species) &&
            lowCurrFilters.includes(itemList[i].category)
          ) {
            filteredProducts.push(itemList[i])
          } else if (
            lowCurrFilters.includes(itemList[i].species) &&
            !lowCurrFilters.includes(itemList[i].category)
          ) {
            filteredProducts.push(itemList[i])
          }
        } else {
          break
        }
      }
    }
    return filteredProducts
  }

  render() {
    let productsToShow = this.filteringProd(
      this.state.currFilters,
      this.state.filterList,
      this.state.itemList
    )
    let species = this.state.filterList.slice(0, 5)
    let categories = this.state.filterList.slice(5)
    return (
      <div className="searchContainer">
        <form>
          <div key="allCheck" id="allFilter">
            <label htmlFor="myInput">All</label>
            <input
              id="myInput"
              type="checkbox"
              onClick={() => this.onFilterChange('ALL')}
              checked={
                this.state.currFilters.length === this.state.filterList.length
              }
            />
          </div>
          {species.map((filt, idx) => (
            <div key={idx} id="speciesFilters">
              <React.Fragment>
                <label htmlFor={filt.id}>{filt.value.toLowerCase()}</label>
                <input
                  id={filt.id}
                  type="checkbox"
                  checked={this.state.currFilters.includes(filt.value)}
                  onClick={() => this.onFilterChange(filt.value)}
                />
              </React.Fragment>
            </div>
          ))}
          {categories.map((filt, idx) => (
            <div key={idx} id="categoriesFilters">
              <React.Fragment>
                <label htmlFor={filt.id}>{filt.value.toLowerCase()}</label>
                <input
                  id={filt.id}
                  type="checkbox"
                  checked={this.state.currFilters.includes(filt.value)}
                  onClick={() => this.onFilterChange(filt.value)}
                />
              </React.Fragment>
            </div>
          ))}
        </form>
        <ul style={{marginLeft: '70px'}}>
          {productsToShow.map(item => (
            <div key={item.id}>
              <li>
                <h3>{item.name}</h3>
                <img src={item.imageUrl} />
                <h4>{`$${item.price}`}</h4>
                <Link to={`/products/${item.id}`}>View Product Details</Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.productsReducer
})

const mapDispatch = {
  fetchProdFunc: fetchProducts
}

export default connect(mapState, mapDispatch)(AllProducts)
