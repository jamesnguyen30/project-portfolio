import axios from 'axios'
import { apiConfig, getRequestConfig } from '../constants/config/apiConfig'

const getTodayHeadlines = () => {
  return axios.get(`${apiConfig.baseUrl}/headlines`, getRequestConfig()).then(response => {
    return response.data
  })
}

export {
  getTodayHeadlines
}
