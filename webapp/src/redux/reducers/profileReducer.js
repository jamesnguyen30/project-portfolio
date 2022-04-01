import {
  PROFILE_FETCHED,
  PROFILE_NOT_FETCHED,
  PROFILE_FETCHED_ERROR
} from '../actions/index'

const profileState = {
  type: null,
  displayName: null,
  email: null,
  emailVerified: null,
  photoURL: null
}

const profileReducer = (state = profileState, action) => {
  switch (action.type) {
    case PROFILE_FETCHED: {
      return {
        ...state,
        type: action.type,
        displayName: action.payload.displayName,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified,
        photoURL: action.payload.photoURL
      }
    }

    case PROFILE_NOT_FETCHED:
      return {
        ...state,
        type: action.type,
        displayName: null,
        email: null,
        emailVerified: null,
        photoURL: null
      }

    case PROFILE_FETCHED_ERROR:
      return {
        ...state,
        type: action.type,
        displayName: null,
        email: null,
        emailVerified: null,
        photoURL: null
      }
    default:
      return state
  }
}

export default profileReducer
