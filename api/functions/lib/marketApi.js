const {searchSymbol, candleData, quote} = require("./finnhub");
const {historicalData} = require("./twelvedata");

exports.searchSymbol = (q) => {
  return searchSymbol(q);
};

exports.getQuote = (symbol) => {
  return quote(symbol);
};

exports.candleData = (symbol, days = 30) => {
  return candleData(symbol, days);
};

exports.historicalData = (symbols) => {
  return historicalData(symbols);
};
