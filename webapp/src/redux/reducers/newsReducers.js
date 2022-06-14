import {
  HEADLINES_FETCHED,
  HEADLINES_NOT_FETCHED
} from '../actions/index'

const initState = {
  type: null,
  headlines: [],
  error: null
}

const newsReducers = (state = initState, action) => {
  switch (action.type) {
    case HEADLINES_FETCHED:
      return {
        type: action.type,
        headlines: action.payload,
        error: null
      }
    case HEADLINES_NOT_FETCHED:
      return {
        type: action.type,
        headlines: [],
        error: action.error
      }
    default:
      return state
  }
}

export default newsReducers
