import {
  SIGNED_IN,
  NOT_SIGNED_IN,
  SIGNED_IN_ERROR,
  SIGN_OUT_ERROR,
  SIGNED_UP_ERROR
} from '../actions/index'

const initState = {
  type: null,
  error: null
  // idToken: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        type: action.type,
        error: null
      }
    case NOT_SIGNED_IN:
      return {
        type: action.type,
        error: action.payload
      }
    case SIGNED_IN_ERROR: case SIGN_OUT_ERROR: case SIGNED_UP_ERROR:
      return {
        ...state,
        type: action.type,
        error: action.payload
      }
    default:
      return state
  }
}

export default authReducer
