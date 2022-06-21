import {
  HEADLINES_FETCHED,
  HEADLINES_NOT_FETCHED,
  NEWS_FETCHED,
  NEWS_NOT_FETCHED
} from '../actions/index'

import {
  getTodayHeadlines,
  getNewsByTerm
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

const getNewsByTermAction = (term) => {
  return dispatch => {
    getNewsByTerm(term).then(response => {
      console.log(response)
      dispatch({
        type: NEWS_FETCHED,
        payload: { term: term, news: response.data }
      })
    }).catch(err => {
      console.log(err)
      dispatch({
        type: NEWS_NOT_FETCHED,
        error: err
      })
    })
  }
}

export {
  getTodayHeadlinesAction,
  getNewsByTermAction
}
