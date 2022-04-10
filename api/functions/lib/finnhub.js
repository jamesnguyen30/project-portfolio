const axios = require('axios')

const { finnhubApiKey } = require("../secrets/api_keys")

const FINNHUB_URL = 'https://finnhub.io/api/v1'

exports.searchSymbol = (q) => {
  return axios.get(`${FINNHUB_URL}/search?q=${q}&token=${finnhubApiKey}`)
}

exports.quote = (symbol) => {
  return axios.get(`${FINNHUB_URL}/quote?symbol=${symbol}&token=${finnhubApiKey}`)
}

exports.candleData = (symbol, days = 30) => {
  var a = new Date()
  //to UNIX Timestamp
  const to = Math.floor(a.getTime() / 1000)
  a.setDate(a.getDate() - days);
  const from = Math.floor(a.getTime() / 1000)
  return axios.get(`${FINNHUB_URL}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${finnhubApiKey}`)
}

