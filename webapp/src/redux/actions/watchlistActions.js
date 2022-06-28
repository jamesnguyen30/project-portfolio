import {
  WATCHLIST_FETCHED,
  WATCHLIST_FETCH_FAILED,
  WATCHLIST_NOT_FETCHED,
  WATCHLIST_UPDATED,
  WATCHLIST_UPDATE_FAILED
} from './index'

import {
  getWatchlist,
  getGuestWatchlist,
  addWatchlistItem,
  removeWatchlistItem
} from '../../api/market'

const getWatchlistAction = () => {
  return dispatch => {
    getWatchlist().then(data => {
      console.log('watch list fetched ' + JSON.stringify(data))
      dispatch({
        type: WATCHLIST_FETCHED,
        payload: data
      })
    }).catch(err => {
      console.error(err)
      dispatch({
        type: WATCHLIST_FETCH_FAILED,
        payload: err
      })
    })
  }
}

const getGuestWatchlistAction = () => {
  return dispatch => {
    getGuestWatchlist().then(data => {
      console.log(data)
      dispatch({
        type: WATCHLIST_FETCHED,
        payload: data
      })
    }).catch(err => {
      dispatch({
        type: WATCHLIST_FETCH_FAILED,
        payload: err
      })
    })
  }
}

const addWatchlistAction = (symbol, description) => {
  return dispatch => {
    addWatchlistItem(symbol, description).then(data => {
      dispatch({
        type: WATCHLIST_UPDATED,
        payload: { name: { symbol: symbol, description: description } }
      })
    }).catch(err => {
      dispatch({
        type: WATCHLIST_UPDATE_FAILED,
        payload: err
      })
    })
  }
}

const removeWatchlistAction = (symbol, description) => {
  return dispatch => {
    removeWatchlistItem(symbol, description).then(data => {
      dispatch({
        type: WATCHLIST_UPDATED,
        payload: { name: { symbol, description } }
      })
    }).catch(err => {
      dispatch({
        type: WATCHLIST_UPDATE_FAILED,
        payload: err
      })
    })
  }
}

const resetWatchlistState = () => {
  return dispatch => dispatch({
    type: WATCHLIST_NOT_FETCHED
  })
}

export {
  getWatchlistAction,
  getGuestWatchlistAction,
  addWatchlistAction,
  removeWatchlistAction,
  resetWatchlistState
}
