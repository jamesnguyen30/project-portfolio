import {
//   SIGN_IN_FAILED,
//   SIGN_IN_SUCCESSFUL,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESSFUL
//   SIGN_OUT
} from './index'

import { signUp } from '../../api/auth'

const signUpAction = (email, password) => {
  return dispatch => {
    signUp(email, password).then(data => {
      dispatch({
        type: SIGN_UP_SUCCESSFUL,
        payload: data
      })
    }).catch(err => {
      dispatch({
        type: SIGN_UP_FAILED,
        payload: err
      })
    })
  }
}

export { signUpAction }
