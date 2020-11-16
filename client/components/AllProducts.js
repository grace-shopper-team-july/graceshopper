import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {fetchProducts} from '../store/products'
//import SingleProduct component here after merge is done

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currFilters: [],
      filterList: [
        //species
        {
          name: 'dog',
          value: 'DOG'
        },
        {
          name: 'cat',
          value: 'CAT'
        },
        {
          name: 'hedgehog',
          value: 'HEDGEHOG'
        },
        {
          name: 'reptile',
          value: 'REPTILE'
        },
        {
          name: 'ferret',
          value: 'FERRET'
        },
        //clothing category
        {
          name: 'formal',
          value: 'FORMAL'
        },
        {
          name: 'holiday',
          value: 'HOLIDAY'
        },
        {
          name: 'weatherwear',
          value: 'WEATHERWEAR'
        },
        {
          name: 'costume',
          value: 'COSTUME'
        },
        {
          name: 'accessories',
          value: 'ACCESSORIES'
        },
        {
          name: 'everyday',
          value: 'EVERYDAY'
        }
      ],
      itemList: []
    }
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

  render() {
    let filteredProducts = []
    if (
      this.state.currFilters.length === 0 ||
      this.state.currFilters.length === this.state.filterList
    ) {
      filteredProducts = this.state.itemList
    } else {
      let lowCurrFilters = this.state.currFilters.map(currFilt => {
        if (currFilt === 'DOG') {
          return 'dog'
        }
        if (currFilt === 'CAT') {
          return 'cat'
        }
        if (currFilt === 'HEDGEHOG') {
          return 'hedgehog'
        }
        if (currFilt === 'REPTILE') {
          return 'reptile'
        }
        if (currFilt === 'FERRET') {
          return 'ferret'
        }
        if (currFilt === 'FORMAL') {
          return 'formal'
        }
        if (currFilt === 'HOLIDAY') {
          return 'holiday'
        }
        if (currFilt === 'WEATHERWEAR') {
          return 'weatherwear'
        }
        if (currFilt === 'COSTUME') {
          return 'costume'
        }
        if (currFilt === 'ACCESSORIES') {
          return 'accessories'
        }
        if (currFilt === 'EVERYDAY') {
          return 'everyday'
        }
      })
      let products = [...this.state.itemList]
      for (let i = 0; i < products.length; i++) {
        if (lowCurrFilters.length === 1) {
          if (lowCurrFilters.includes(this.state.itemList[i].species)) {
            filteredProducts.push(this.state.itemList[i])
          }
          if (lowCurrFilters.includes(this.state.itemList[i].category)) {
            filteredProducts.push(this.state.itemList[i])
          }
        } else if (lowCurrFilters.length > 1) {
          if (
            lowCurrFilters.includes(this.state.itemList[i].species) &&
            lowCurrFilters.includes(this.state.itemList[i].category)
          ) {
            filteredProducts.push(this.state.itemList[i])
          }
        } else {
          break
        }
      }
    }
    let species = this.state.filterList.slice(0, 5)
    let categories = this.state.filterList.slice(5)
    return (
      <div className="searchContainer">
        <form>
          <div id="allFilter">
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
          {species.map(filt => (
            <div id="speciesFilters">
              <React.Fragment>
                <label htmlFor={filt.id}>{filt.name}</label>
                <input
                  id={filt.id}
                  type="checkbox"
                  checked={this.state.currFilters.includes(filt.value)}
                  onClick={() => this.onFilterChange(filt.value)}
                />
              </React.Fragment>
            </div>
          ))}
          {categories.map(filt => (
            <div id="categoriesFilters">
              <React.Fragment>
                <label htmlFor={filt.id}>{filt.name}</label>
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
          {filteredProducts.map(item => (
            <div key={item.id}>
              <li>
                {/* {item.name} -- {item.species} */}
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
