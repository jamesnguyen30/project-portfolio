import {
  SIGNED_IN,
  NOT_SIGNED_IN
} from '../actions/index'

const initState = {
  timeStamp: null,
  type: null,
  errorCode: null,
  displayName: null,
  email: null,
  emailVerified: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        timeStamp: Date.now(),
        type: action.type,
        displayName: action.payload.displayName,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified
      }

    case NOT_SIGNED_IN:
      return {
        timeStamp: Date.now(),
        type: action.type,
        displayName: null,
        email: null,
        emailVerified: null,
        errorCode: action.payload
      }
    default:
      return state
  }
}

export default authReducer
