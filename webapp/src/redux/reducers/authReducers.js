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
      var errorMessage
      console.log(action.payload)
      switch (action.payload) {
        case 'auth/wrong-password':
          errorMessage = 'Wrong email or password, please try again'
          break
        default:
          errorMessage = 'Unknown error, please check log'
          break
      }
      return {
        timeStamp: Date.now(),
        type: action.type,
        displayName: null,
        email: null,
        emailVerified: null,
        errorCode: errorMessage
      }
    default:
      return state
  }
}

export default authReducer
