import axios from 'axios'
import { apiConfig, getRequestConfig } from '../constants/config/apiConfig'

const searchSymbol = (query) => {
  console.log('searching symbol ' + query)
  return axios.post(`${apiConfig.baseUrl}/searchSymbol`, { q: query }, getRequestConfig()).then(response => {
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
  return axios.get(`${apiConfig.baseUrl}/watchlist`, getRequestConfig()).then(response => {
    return response.data
  })
}

const getGuestWatchlist = () => {
  return axios.get(`${apiConfig.baseUrl}/watchlist/guest`, getRequestConfig()).then(response => {
    return response.data
  })
}

const addWatchlistItem = (symbol, description) => {
  return axios.post(`${apiConfig.baseUrl}/watchlist`, { symbol: symbol, description: description }, getRequestConfig()).then(response => {
    return response.data
  })
}

const removeWatchlistItem = (symbol, description) => {
  return axios.delete(`${apiConfig.baseUrl}/watchlist`,
    { ...getRequestConfig(), data: { symbol: symbol, description: description } })
    .then(response => {
      return response.data
    })
}

const getQuote = (symbol) => {
  return axios.post(`${apiConfig.baseUrl}/quote`, { symbol: symbol }, getRequestConfig()).then(response =>
    (response.data))
}

export {
  searchSymbol,
  getCandleData,
  getWatchlist,
  getGuestWatchlist,
  addWatchlistItem,
  removeWatchlistItem,
  getQuote
}
