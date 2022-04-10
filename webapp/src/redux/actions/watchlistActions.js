import {
  WATCHLIST_FETCHED,
  WATCHLIST_FETCH_FAILED
} from './index'

import { getWatchlist } from '../../api/market'

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

export { getWatchlistAction }
