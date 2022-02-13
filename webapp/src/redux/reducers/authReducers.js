// const SIGN_IN_SUCCESSFUL = 'SIGN_IN_SUCCESSFUL'
// const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
const SIGN_UP_SUCCESSFUL = 'SIGN_UP_SUCCESSFUL'
const SIGN_UP_FAILED = 'SIGN_UP_FAILED'

const initState = {
  token: null,
  timeStamp: null,
  type: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESSFUL:
      return {
        token: action.payload.token,
        timeStamp: Date.now(),
        type: action.type
      }
    case SIGN_UP_FAILED:
      return {
        token: null,
        timeStamp: Date.now(),
        type: action.type
      }
    default:
      return state
  }
}

export default authReducer
