import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, UserHome, AllProducts} from './components/'
import {me} from './store'
import SinglePage from './components/SingleProduct'
import {Signup} from './components/SignUp'
import {Cart} from './components/Cart'
import OrderDetails from './components/OrderDetails'
import AdminHome from './components/Admin-Home'
import AdminManageUsers from './components/Admin_ManageUsers'
import OrderHistory from './components/OrderHistory'
import EditUser from './components/EditUser'
import ManageProducts from './components/Admin_ManageProducts'
import EditProduct from './components/Admin_EditProduct'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props
    // console.log('isadmin', this.props.isAdmin)
    // console.log('islogged', this.props.isLoggedIn)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:productId" component={SinglePage} />
        <Route path="/products" component={AllProducts} />
        <Route path="/cart" component={Cart} />
        {isAdmin && (
          <Switch>
            <Route exact path="/home/admin" component={AdminHome} />
            <Route
              exact
              path="/home/orders/:orderId"
              component={OrderDetails}
            />
            <Route
              exact
              path="/home/manageusers"
              component={AdminManageUsers}
            />
            <Route exact path="/home/orders" component={OrderHistory} />
            <Route exact path="/home/edit_account" component={EditUser} />
            <Route
              exact
              path="/home/manageproducts"
              component={ManageProducts}
            />
            <Route exact path="/home/edit/:productId" component={EditProduct} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route
              exact
              path="/home/orders/:orderId"
              component={OrderDetails}
            />
            <Route exact path="/home/orders" component={OrderHistory} />
            <Route exact path="/home/edit_account" component={EditUser} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.id,
    isAdmin: state.user.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
