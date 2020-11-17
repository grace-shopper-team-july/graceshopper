import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div id="navbar">
    <h1 id="logo">PET ♥ THREADZ</h1>
    <nav>
      {isAdmin ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <h4>
            <Link to="/home/admin">Admin Home</Link>
          </h4>
          <h4>
            <Link to="/products">Products</Link>
          </h4>
          <h4>
            <Link to="/cart">Cart</Link>
          </h4>
        </div>
      ) : (
        <div />
      )}
      {!isAdmin && isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <h4>
            <Link to="/home">Home</Link>
          </h4>
          <h4>
            <Link to="/products">Products</Link>
          </h4>
          <h4>
            <Link to="/cart">Cart</Link>
          </h4>
        </div>
      ) : (
        <div />
      )}
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          <h4>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </h4>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <h4>
            <Link to="/">Home</Link>
          <h4>
            <Link to="/products">Products</Link>
          </h4>
          <h4>
            <Link to="/login">Login</Link>
          </h4>
          <h4>
            <Link to="/signup">Sign Up</Link>
          </h4>
          <h4>
            <Link to="/cart">Cart</Link>
          </h4>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id,
    isAdmin: !!state.user.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
