import {
  SIGNED_IN,
  NOT_SIGNED_IN
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
        type: NOT_SIGNED_IN,
        payload: err.response.data.error
      })
    })
  }
}

const signOutAction = () => {
  return dispatch => {
    signOut().then(data => {
      dispatch({
        type: NOT_SIGNED_IN,
        payload: data
      })
    }).catch(err => {
      dispatch({
        type: NOT_SIGNED_IN,
        payload: err.response.error
      })
    })
  }
}

export { signUpAction, signInAction, signOutAction }
