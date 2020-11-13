import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {signup} from '../store/user'

/**
 * COMPONENT
 */
export class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit} name={this.props.name}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="addressLine1">
              <small>Address Line 1</small>
            </label>
            <input name="addressLine1" type="text" />
          </div>
          <div>
            <label htmlFor="addressLine2">
              <small>Address Line 2</small>
            </label>
            <input name="addressLine2" type="text" />
          </div>
          <div>
            <label htmlFor="city">
              <small>City</small>
            </label>
            <input name="city" type="text" />
          </div>
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <input name="state" type="text" />
          </div>
          <div>
            <label htmlFor="zip">
              <small>Zip Code</small>
            </label>
            <input name="zip" type="text" />
          </div>
          <div>
            <label htmlFor="phone">
              <small>Phone</small>
            </label>
            <input name="phone" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{this.props.displayName}</button>
          </div>
          {this.props.error &&
            this.props.error.response && (
              <div> {this.props.error.response.data} </div>
            )}
        </form>
        <a href="/auth/google">{this.props.displayName} with Google</a>
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
    signup: user => dispatch(signup(user)),
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
      dispatch(
        signup({
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
      )
      evt.target.reset()
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignupForm)

/**
 * PROP TYPES
 */
SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
