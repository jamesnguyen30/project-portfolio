import {
  HEADLINES_FETCHED, HEADLINES_NOT_FETCHED
//   HEADLINES_NOT_FETCHED
} from '../actions/index'

import {
  getTodayHeadlines
} from '../../api/news'

const getTodayHeadlinesAction = () => {
  return dispatch => {
    getTodayHeadlines().then(data => {
      dispatch({
        type: HEADLINES_FETCHED,
        payload: data.data
      })
    }).catch(err => {
      console.log(err)
      dispatch({
        type: HEADLINES_NOT_FETCHED,
        error: err
      })
    })
  }
}

export {
  getTodayHeadlinesAction
}
