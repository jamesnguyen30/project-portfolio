const fs = require("fs");

const MOCK_RESPONSE_PATH =
`/Users/nguyen/Desktop/project-book-app/api/
functions/lib/mockTimeseriesResponse.json`;

// @params symbols: array

exports.historicalData = (symbols) => {
  // var symbolsString = symbols.join(',')
  // Production
  // Mock response
  return new Promise((res, rej) => {
    setTimeout(()=>{
      fs.readFile(MOCK_RESPONSE_PATH, "utf8", (err, text)=>{
        if (err) rej(err);
        else res({data: JSON.parse(text)});
      });
    }, 1000);
  });
};
