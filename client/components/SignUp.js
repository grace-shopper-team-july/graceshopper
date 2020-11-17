import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {signup} from '../store/user'
import {Redirect, Route, NavLink} from 'react-router-dom'

/**
 * COMPONENT
 */
export class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToLogin: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const firstName = evt.target.firstName.value
    const lastName = evt.target.lastName.value
    const addressLine1 = evt.target.addressLine1.value
    const addressLine2 = evt.target.addressLine2.value
    const city = evt.target.city.value
    const state = evt.target.state.value
    const zip = evt.target.zip.value
    const phone = evt.target.phone.value
    const email = evt.target.email.value
    const password = evt.target.password.value
    this.props.signup({
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      phone,
      email,
      password
    })
    evt.target.reset()
    this.setState({redirectToLogin: true})
  }

  render() {
    const redirectToLogin = this.state.redirectToLogin
    return (
      <div className="main-content">
        <div className="main-content-child">
          <h1>Hi There, Create Your Account Here! </h1>
          <form onSubmit={this.handleSubmit} name={this.props.name}>
            <div className="form">
              <p>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                />
              </p>
              <p>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </p>
              <p>
                <input
                  name="addressLine1"
                  type="text"
                  placeholder="Address Line 1"
                  required
                />
              </p>
              <p>
                <input
                  name="addressLine2"
                  type="text"
                  placeholder="Address Line2 (optional)"
                />
              </p>
              <p>
                <input name="city" type="text" placeholder="City" required />
              </p>
              <p>
                <input name="state" type="text" placeholder="State" required />
              </p>
              <p>
                <input name="zip" type="text" placeholder="Zip Code" required />
              </p>
              <p>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  required
                />
              </p>
              <p>
                <input name="email" type="email" placeholder="Email" required />
              </p>
              <p>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </p>
              <button type="submit" className="button">
                {this.props.displayName}
              </button>
            </div>
            {this.props.error &&
              this.props.error.response && (
                <div> {this.props.error.response.data} </div>
              )}
          </form>
          {redirectToLogin && <Redirect to="/login" />}
          <a href="/auth/google">{this.props.displayName} with Google</a>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    signup: user => dispatch(signup(user))
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignupForm)

/**
 * PROP TYPES
 */
SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
