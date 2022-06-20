import {
  HEADLINES_FETCHED,
  HEADLINES_NOT_FETCHED,
  NEWS_FETCHED,
  NEWS_NOT_FETCHED
} from '../actions/index'

const initState = {
  type: null,
  headlines: [],
  news: [],
  error: null
}

const newsReducers = (state = initState, action) => {
  switch (action.type) {
    case HEADLINES_FETCHED:
      return {
        ...state,
        type: action.type,
        headlines: action.payload,
        error: null
      }
    case HEADLINES_NOT_FETCHED:
      return {
        ...state,
        type: action.type,
        headlines: [],
        error: action.error
      }
    case NEWS_FETCHED:
      return {
        ...state,
        type: action.type,
        news: action.payload,
        error: null
      }
    case NEWS_NOT_FETCHED:
      return {
        ...state,
        type: action.type,
        news: [],
        error: action.error
      }
    default:
      return state
  }
}

export default newsReducers
