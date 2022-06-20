import {
  WATCHLIST_FETCHED,
  WATCHLIST_FETCH_FAILED,
  WATCHLIST_UPDATED,
  WATCHLIST_UPDATE_FAILED,
  WATCHLIST_NOT_FETCHED
} from '../actions/index'

// const defaultWatchlist = [
//   'Apple',
//   'Amazon',
//   'Google',
//   'Tesla',
//   'Nvidia',
//   'Netflix'
// ]

const initialState = {
  type: null,
  watchlist: [],
  error: null
}

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case WATCHLIST_FETCHED:
      return {
        type: action.type,
        watchlist: action.payload
      }
    case WATCHLIST_FETCH_FAILED:
      return {
        type: action.type,
        error: action.payload
      }
    case WATCHLIST_UPDATED:
      return {
        type: action.type,
        watchlist: [
          ...state.watchlist,
          action.payload
        ]
      }
    case WATCHLIST_UPDATE_FAILED:
      return {
        ...state,
        type: action.type
      }
    case WATCHLIST_NOT_FETCHED:
      return {
        type: action.type,
        watchlist: [],
        error: null
      }
    default:
      return state
  }
}

export default watchlistReducer
