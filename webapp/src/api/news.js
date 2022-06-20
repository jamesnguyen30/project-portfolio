import axios from 'axios'
import { apiConfig, getRequestConfig } from '../constants/config/apiConfig'

const getTodayHeadlines = () => {
  return axios.get(`${apiConfig.baseUrl}/headlines`, getRequestConfig()).then(response => {
    return response.data
  })
}

const getNewsByTerm = (term) => {
  return axios.get(`${apiConfig.baseUrl}/term/${term}`, getRequestConfig()).then(response => {
    return response.data
  })
}

export {
  getTodayHeadlines,
  getNewsByTerm
}
