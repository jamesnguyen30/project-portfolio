import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const searchSymbol = (query) => {
  console.log('searching symbol ' + query)
  return axios.post(`${apiConfig.baseUrl}/searchSymbol`, { q: query }).then(response => {
    return response.data
  })
}

const getCandleData = (symbol, days) => {
  const req = {
    symbol: symbol,
    days: days
  }
  return axios.post(`${apiConfig.baseUrl}/candleData`, req).then(response => {
    return response.data
  })
}

const getWatchlist = () => {
  return axios.get(`${apiConfig.baseUrl}/watchlist`).then(response => {
    console.log(response.data)
    return response.data
  })
}

const addWatchlistItem = (symbol) => {
  return axios.post(`${apiConfig.baseUrl}/watchlist`, { symbol: symbol }).then(response => {
    return response.data
  })
}

const removeWatchlistItem = (symbol) => {
  return axios.delete(`${apiConfig.baseUrl}/watchlist`,
    { data: { symbol: symbol } })
    .then(response => {
      return response.data
    })
}

const getQuote = (symbol) => {
  return axios.post(`${apiConfig.baseUrl}/quote`, { symbol: symbol }).then(response =>
    (response.data))
}

export {
  searchSymbol,
  getCandleData,
  getWatchlist,
  addWatchlistItem,
  removeWatchlistItem,
  getQuote
}
