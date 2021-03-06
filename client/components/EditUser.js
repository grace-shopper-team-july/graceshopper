import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store/user'

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: undefined,
      lastName: undefined,
      addressLine1: undefined,
      addressLine2: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
      phone: undefined,
      email: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(id) {
    return evt => {
      evt.preventDefault()
      const firstName = this.state.firstName
      const lastName = this.state.lastName
      const addressLine1 = this.state.addressLine1
      const addressLine2 = this.state.addressLine2
      const city = this.state.city
      const zip = this.state.zip
      const phone = this.state.phone
      const email = this.state.email
      const state = this.state.state

      this.props.editUser(id, {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        phone,
        email
      })
      evt.target.reset()
    }
  }

  render() {
    const user = this.props.user.user
    return (
      <div className="userCont">
        <div className="userInfo">
          <h2>User Information:</h2>
          <h4>
            Name: {user.firstName} {user.lastName}
          </h4>
          <h4>Email: {user.email}</h4>
          <h4>AddressLine1: {user.addressLine1} </h4>
          <h4>AddressLine2: {user.addressLine2} </h4>
          <h4>City: {user.city} </h4>
          <h4>State: {user.state} </h4>
          <h4>Zip: {user.zip} </h4>
          <h4>Phone: {user.phone} </h4>
        </div>
        <div className="userUpdateForm">
          <form onSubmit={this.handleSubmit(user.id)}>
            <div className="update">
              <h3>Update Your Account Info:</h3>
            </div>
            <div>
              <label htmlFor="firstName">
                <small>First Name:</small>
              </label>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName || this.props.user.user.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name:</small>
              </label>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName || this.props.user.user.lastName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="addressLine1">
                <small>Address Line 1:</small>
              </label>
              <input
                name="addressLine1"
                type="text"
                value={
                  this.state.addressLine1 || this.props.user.user.addressLine1
                }
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="addressLine2">
                <small>Address Line 2:</small>
              </label>
              <input
                name="addressLine2"
                type="text"
                value={
                  this.state.addressLine2 || this.props.user.user.addressLine2
                }
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">
                <small>City:</small>
              </label>
              <input
                name="city"
                type="text"
                value={this.state.city || this.props.user.user.city}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">
                <small>State:</small>
              </label>
              <input
                name="state"
                type="text"
                value={this.state.state || this.props.user.user.state}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="zip">
                <small>Zip:</small>
              </label>
              <input
                name="zip"
                type="text"
                value={this.state.zip || this.props.user.user.zip}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone">
                <small>Phone:</small>
              </label>
              <input
                name="phone"
                type="text"
                value={this.state.phone || this.props.user.user.phone}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">
                <small>Email:</small>
              </label>
              <input
                name="email"
                type="text"
                value={this.state.email || this.props.user.user.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="adminPortalBtns">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    editUser: (id, userInfo) => dispatch(editUser(id, userInfo))
  }
}

export default connect(mapState, mapDispatch)(EditUser)
