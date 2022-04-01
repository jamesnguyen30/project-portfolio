import {
  SIGNED_IN,
  NOT_SIGNED_IN,
  SIGNED_IN_ERROR,
  SIGN_OUT_ERROR
} from '../actions/index'

const initState = {
  timeStamp: null,
  type: null,
  error: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        timeStamp: Date.now(),
        type: action.type,
        error: null
      }
    case NOT_SIGNED_IN:
      return {
        timeStamp: Date.now(),
        type: action.type,
        error: null
      }
    case SIGNED_IN_ERROR: case SIGN_OUT_ERROR:
      return {
        timeStamp: Date.now(),
        type: action.type,
        error: action.payload
      }
    default:
      return state
  }
}

export default authReducer
