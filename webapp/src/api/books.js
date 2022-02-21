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

const getBookById = (bookid) =>
  axios.get(`http://localhost:5000/booksocialnetwork-4e3b7/us-central1/api/getBook/?id=${bookid}`)
    .then(response => response)

export { search, getBookById }
