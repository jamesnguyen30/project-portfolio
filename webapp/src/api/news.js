import axios from 'axios'
import { apiConfig, getRequestConfig } from '../constants/config/apiConfig'

const getTodayHeadlines = () => {
  return axios.get(`${apiConfig.baseUrl}/headlines`, getRequestConfig()).then(response => {
    return response.data
  })
}

const getNewsByTerm = (term, limit = 20, page = 0) => {
  return axios.get(`${apiConfig.baseUrl}/news?term=${term}&limit=${limit}&page=${page}`, getRequestConfig()).then(response => {
    return response
  })
}

export {
  getTodayHeadlines,
  getNewsByTerm
}
