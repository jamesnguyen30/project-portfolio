import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const getCandleData = (symbol, days) => {
  const req = {
    symbol: symbol,
    days: days
  }
  return axios.post(`${apiConfig.baseUrl}/candleData`, req).then(response => {
    return response.data
  })
}

export { getCandleData }
