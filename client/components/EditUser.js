import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store/user'

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(id) {
    return evt => {
      evt.preventDefault()
      const firstName =
        evt.target.firstName.value === ''
          ? this.props.user.user.firstName
          : evt.target.firstName.value
      const lastName =
        evt.target.lastName.value === ''
          ? this.props.user.user.lastName
          : evt.target.lastName.value
      const addressLine1 =
        evt.target.addressLine1.value === ''
          ? this.props.user.user.addressLine1
          : evt.target.addressLine1.value
      const addressLine2 =
        evt.target.addressLine2.value === ''
          ? this.props.user.user.addressLine2
          : evt.target.addressLine2.value
      const city =
        evt.target.city.value === ''
          ? this.props.user.user.city
          : evt.target.city.value
      const state =
        evt.target.state.value === ''
          ? this.props.user.user.state
          : evt.target.state.value
      const zip =
        evt.target.zip.value === ''
          ? this.props.user.user.zip
          : evt.target.zip.value
      const phone =
        evt.target.phone.value === ''
          ? this.props.user.user.phone
          : evt.target.phone.value
      const email =
        evt.target.email.value === ''
          ? this.props.user.user.email
          : evt.target.email.value
      //const password = evt.target.password.value === '' ? this.props.user.user.password : evt.target.password.value
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
      <div>
        <div>
          <h2>User Information:</h2>
          <h5>
            Name: {user.firstName} {user.lastName}
          </h5>
          <h5>Email: {user.email}</h5>
          <h5>AddressLine1: {user.addressLine1} </h5>
          <h5>AddressLine2: {user.addressLine2} </h5>
          <h5>City: {user.city} </h5>
          <h5>State: {user.state} </h5>
          <h5>Zip: {user.zip} </h5>
          <h5>Phone: {user.phone} </h5>
        </div>
        <form onSubmit={this.handleSubmit(user.id)}>
          <h3>Update Your Account Info:</h3>
          <div>
            <label htmlFor="firstName">
              <small>First Name:</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name:</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="addressLine1">
              <small>Address Line 1:</small>
            </label>
            <input name="addressLine1" type="text" />
          </div>
          <div>
            <label htmlFor="addressLine2">
              <small>Address Line 2:</small>
            </label>
            <input name="addressLine2" type="text" />
          </div>
          <div>
            <label htmlFor="city">
              <small>City:</small>
            </label>
            <input name="city" type="text" />
          </div>
          <div>
            <label htmlFor="state">
              <small>State:</small>
            </label>
            <input name="state" type="text" />
          </div>
          <div>
            <label htmlFor="zip">
              <small>Zip:</small>
            </label>
            <input name="zip" type="text" />
          </div>
          <div>
            <label htmlFor="phone">
              <small>Phone:</small>
            </label>
            <input name="phone" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email:</small>
            </label>
            <input name="email" type="text" />
          </div>
          {/* <div>
            <label htmlFor="password">
                <small>Password:</small>
                </label>
            <input name='password' type='password' />
          </div> */}
          <button>Submit</button>
        </form>
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
