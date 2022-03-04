import {
  PROFILE_FETCHED,
  PROFILE_FETCHED_FAILED
} from '../actions/index'

const profileState = {
  timeStamp: null,
  displayName: null,
  email: null,
  emailVerified: null,
  favorites: null
}

const profileReducers = (state = profileState, action) => {
  switch (action.type) {
    case PROFILE_FETCHED: {
      return {
        ...state,
        timeStamp: Date.now(),
        displayName: action.payload.displayName,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified,
        favorites: action.payload.favorites
      }
    }

    case PROFILE_FETCHED_FAILED:
      return {
        ...state,
        timeStamp: Date.now(),
        displayName: null,
        email: null,
        emailVerified: null,
        favorites: null
      }
    default:
      return state
  }
}

export default profileReducers
