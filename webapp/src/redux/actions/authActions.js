import {
  SIGNED_IN,
  NOT_SIGNED_IN,
  SIGNED_IN_ERROR,
  SIGN_OUT_ERROR
//   SIGN_OUT
} from './index'

import { signUp, signIn, signOut, checkSignin } from '../../api/auth'

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
      dispatch({
        type: NOT_SIGNED_IN
      })
    }).catch(err => {
      dispatch({
        type: SIGN_OUT_ERROR,
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

const checkSignInAction = () => {
  return dispatch => {
    checkSignin().then(() => {
      dispatch({
        type: SIGNED_IN
      })
    }).catch(err => {
      dispatch({
        type: NOT_SIGNED_IN,
        payload: err.response.error
      })
    })
  }
}

export { signUpAction, signInAction, signOutAction, resetAuthState, checkSignInAction }
