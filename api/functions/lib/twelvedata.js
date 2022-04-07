const axios = require("axios")
const {mockTimeseriesResponse} = require('./mockTimeseriesResponse.json')
const { twelveDataApiKey } = require("../secrets/api_keys")
const fs = require('fs')

const TWELVE_DATA_URL = 'https://api.twelvedata.com'

const MOCK_RESPONSE_PATH = '/Users/nguyen/Desktop/project-book-app/api/functions/lib/mockTimeseriesResponse.json'

//@params symbols: array

exports.historicalData = (symbols) => {
  // var symbolsString = symbols.join(',')
  //Production
  // return axios.get(`${TWELVE_DATA_URL}/time_series?apikey=${twelveDataApiKey}&interval=1day&symbol=${symbolsString}`)
  //Mock response 
  return new Promise((res, rej) => {
    setTimeout(()=>{
      fs.readFile(MOCK_RESPONSE_PATH, 'utf8', (err, text)=>{
        if(err) rej(err)
        else res({data: JSON.parse(text)})
      })
    }, 1000)
  })
}