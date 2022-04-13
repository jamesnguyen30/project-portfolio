import {
  SIGNED_IN,
  // SIGN_IN_SUCCESS,
  // SIGN_IN_FAIL,
  NOT_SIGNED_IN,
  // SIGNED_IN_ERROR,
  SIGN_OUT_ERROR,
  SIGNED_UP_ERROR
//   SIGN_OUT
} from './index'

import {
  saveIdToken,
  getIdToken
} from '../../utils/storage'

import {
  signUp,
  // signIn,
  signOut, checkSignin, checkAuthorization
} from '../../api/auth'

const signUpAction = (email, password) => {
  return dispatch => {
    signUp(email, password).then(idToken => {
      saveIdToken(idToken)
      dispatch({
        type: SIGNED_IN
      })
    }).catch(err => {
      dispatch({
        type: SIGNED_UP_ERROR,
        payload: err.code
      })
    })
  }
}

// const signInAction = (email, password) => {
//   return dispatch => {
//     signIn(email, password).then(idToken => {
//       saveIdToken(idToken)
//       dispatch({
//         type: SIGN_IN_SUCCESS,
//         payload: idToken
//       })
//     }).catch(err => {
//       dispatch({
//         type: SIGN_IN_FAIL,
//         payload: err.code
//       })
//     })
//   }
// }

const signOutAction = () => {
  return dispatch => {
    signOut().then(_ => {
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

const checkAuthorizationAction = () => {
  const idToken = getIdToken()
  return dispatch => {
    if (idToken !== null) {
      checkAuthorization(idToken).then(response => {
        dispatch({
          type: SIGNED_IN,
          payload: idToken
        })
      }).catch(err => {
        dispatch({
          type: NOT_SIGNED_IN,
          payload: err.response.error
        })
      })
    } else {
      dispatch({
        type: NOT_SIGNED_IN,
        payload: 'Need to sign in'
      })
    }
  }
}

const setAuthAction = (user) => {
  return dispatch => {
    if (user) {
      dispatch({
        type: SIGNED_IN
        // payload: user.accessToken
      })
    } else {
      dispatch({
        type: NOT_SIGNED_IN
      })
    }
  }
}

export {
  signUpAction,
  // signInAction,
  signOutAction,
  resetAuthState,
  checkSignInAction,
  checkAuthorizationAction,
  setAuthAction
}
