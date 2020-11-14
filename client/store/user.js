import axios from 'axios'
import {act} from 'react-test-renderer'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_USER = 'ADD_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_USER = 'UPDATE_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addUser = user => ({
  type: ADD_USER,
  user
})
const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

const updateUser = user => {
  return {
    type: UPDATE_USER,
    user
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    if (res.data.admin) {
      history.push('/home/admin')
    } else {
      history.push('/home')
    }
    //console.log('this is on user reducer', res.data)
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const signup = user => async dispatch => {
  try {
    await axios.post('/auth/signup', user)
  } catch (error) {
    console.error(error)
  }
}

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      //console.log('users', data)
      dispatch(getAllUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const editUser = (id, userInfo) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${id}`, userInfo)
      dispatch(updateUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}
/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  allUsers: []
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case GET_ALL_USERS:
      return {...state, allUsers: action.users}
    case UPDATE_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
