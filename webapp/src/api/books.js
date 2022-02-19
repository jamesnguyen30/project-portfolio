import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const search = (query, maxResults, orderBy, startIndex) => {
  const params = {
    q: query
  }
  if (maxResults) params.maxResults = maxResults
  if (orderBy) params.orderBy = orderBy
  if (startIndex) params.startIndex = startIndex

  const paramsString = new URLSearchParams(params).toString()
  return axios.get(`${apiConfig.baseUrl}/search?${paramsString}`)
}

export { search }
