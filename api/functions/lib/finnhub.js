const axios = require('axios')

const mock = {
  data:
  {
    "count": 32,
    "result": [
      {
        "description": "APPLE INC",
        "displaySymbol": "AAPL",
        "symbol": "AAPL",
        "type": "Common Stock"
      },
      {
        "description": "APPLE INC-CDR",
        "displaySymbol": "AAPL.NE",
        "symbol": "AAPL.NE",
        "type": "Receipt"
      },
      {
        "description": "APPLE INC",
        "displaySymbol": "AAPL.BC",
        "symbol": "AAPL.BC",
        "type": "Common Stock"
      },
      {
        "description": "APPLE INC",
        "displaySymbol": "AAPL.MX",
        "symbol": "AAPL.MX",
        "type": "Common Stock"
      },
      {
        "description": "APPLE INC",
        "displaySymbol": "AAPL.SW",
        "symbol": "AAPL.SW",
        "type": "Common Stock"
      },
      {
        "description": "APPLE INC",
        "displaySymbol": "AAPL.VI",
        "symbol": "AAPL.VI",
        "type": "Common Stock"
      },
      {
        "description": "LS 1X AAPL",
        "displaySymbol": "AAPL.L",
        "symbol": "AAPL.L",
        "type": "ETP"
      },
      {
        "description": "APPLE INC",
        "displaySymbol": "AAPL.MI",
        "symbol": "AAPL.MI",
        "type": "Common Stock"
      },
      {
        "description": "APPLE INC",
        "displaySymbol": "AAPL.SN",
        "symbol": "AAPL.SN",
        "type": "Common Stock"
      },
      {
        "description": "LS 1X AAPL",
        "displaySymbol": "AAPL.AS",
        "symbol": "AAPL.AS",
        "type": "ETP"
      },
      {
        "description": "AA PLC",
        "displaySymbol": "AATDF",
        "symbol": "AATDF",
        "type": "Common Stock"
      },
      {
        "description": "Assura plc",
        "displaySymbol": "A193K2.BE",
        "symbol": "A193K2.BE",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "A2RT8J.BE",
        "symbol": "A2RT8J.BE",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "GU8G.MU",
        "symbol": "GU8G.MU",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "A2RT8J.MU",
        "symbol": "A2RT8J.MU",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "A1HFY3.DU",
        "symbol": "A1HFY3.DU",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "GZCF.HM",
        "symbol": "GZCF.HM",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "GU8G.BE",
        "symbol": "GU8G.BE",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "A1HFY3.BE",
        "symbol": "A1HFY3.BE",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "GZCF.MU",
        "symbol": "GZCF.MU",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "A1HNBA.MU",
        "symbol": "A1HNBA.MU",
        "type": ""
      },
      {
        "description": "Valaris plc",
        "displaySymbol": "0A1P.L",
        "symbol": "0A1P.L",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "A28X36.DU",
        "symbol": "A28X36.DU",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "A2RT8J.DU",
        "symbol": "A2RT8J.DU",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "GZCF.DU",
        "symbol": "GZCF.DU",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "A1HFY3.MU",
        "symbol": "A1HFY3.MU",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "A1HNBA.DU",
        "symbol": "A1HNBA.DU",
        "type": ""
      },
      {
        "description": "Aviva Plc",
        "displaySymbol": "GU8G.DU",
        "symbol": "GU8G.DU",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "A19X59.HM",
        "symbol": "A19X59.HM",
        "type": ""
      },
      {
        "description": "Gaz Capital",
        "displaySymbol": "A19X59.DU",
        "symbol": "A19X59.DU",
        "type": ""
      },
      {
        "description": "Barclays plc",
        "displaySymbol": "A190ZP.MU",
        "symbol": "A190ZP.MU",
        "type": ""
      },
      {
        "description": "XAAR PLC",
        "displaySymbol": "XAR.BE",
        "symbol": "XAR.BE",
        "type": "Common Stock"
      }
    ]
  }
}

const { finnhubApiKey } = require("../secrets/api_keys")

const FINNHUB_URL = 'https://finnhub.io/api/v1'

exports.searchSymbol = (q) => {
  return axios.get(`${FINNHUB_URL}/search?q=aapl&token=${finnhubApiKey}`)
}