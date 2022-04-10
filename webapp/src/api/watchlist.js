import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const getWatchstlist = () => {
  return axios.get(`${apiConfig.baseUrl}/watchlist`).then(response => {
    return response.data
  })
}

export { getWatchstlist }
