import {
  PROFILE_FETCHED,
  // PROFILE_FETCHED_ERROR
  PROFILE_NOT_FETCHED
} from './index'

// import { getProfile } from '../../api/profile'

const getProfileAction = (user) => {
  return dispatch => {
    if (user) {
      dispatch({
        type: PROFILE_FETCHED,
        payload: user
      })
    } else {
      dispatch({
        type: PROFILE_NOT_FETCHED
      })
    }
  //   getProfile().then(data => {
  //     dispatch({
  //       type: PROFILE_FETCHED,
  //       payload: data
  //     })
  //   }).catch(err => {
  //     console.error(err)
  //     dispatch({
  //       type: PROFILE_FETCHED_ERROR,
  //       payload: err
  //     })
  //   })
  }
}

export { getProfileAction }
