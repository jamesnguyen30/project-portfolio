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

export { searchSymbol, getCandleData }
