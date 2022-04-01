import {
  SIGNED_IN,
  NOT_SIGNED_IN,
  SIGNED_IN_ERROR
//   SIGN_OUT
} from './index'

import { signUp, signIn, signOut } from '../../api/auth'

const signUpAction = (email, password) => {
  return dispatch => {
    signUp(email, password).then(data => {
      dispatch({
        type: SIGNED_IN,
        payload: data
      })
    }).catch(err => {
      dispatch({
        type: NOT_SIGNED_IN,
        payload: err.response.data.error
      })
    })
  }
}

const signInAction = (email, password) => {
  return dispatch => {
    signIn(email, password).then(data => {
      dispatch({
        type: SIGNED_IN,
        payload: data
      })
    }).catch(err => {
      dispatch({
        type: SIGNED_IN_ERROR,
        payload: err.response.data.error
      })
    })
  }
}

const signOutAction = () => {
  return dispatch => {
    signOut().then(data => {
      console.log('logged out')
      dispatch({
        type: NOT_SIGNED_IN
      })
    }).catch(err => {
      console.log('error')
      dispatch({
        type: NOT_SIGNED_IN,
        payload: err.response.error
      })
    })
  }
}

const resetAuthState = () => {
  return dispatch => {
    dispatch({
      type: NOT_SIGNED_IN
    })
  }
}

export { signUpAction, signInAction, signOutAction, resetAuthState }
