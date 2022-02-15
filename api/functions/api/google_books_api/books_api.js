const axios = require('axios')
const {googleBooksAPIKey} = require("../../secrets/api_keys")
//ref docs: https://developers.google.com/books/docs/v1/reference/volumes/list?apix_params=%7B%22q%22%3A%22Lord%22%2C%22startIndex%22%3A1%7D
exports.getList = (q, maxResults=10, orderBy='', startIndex = 0 ) => {
    return axios.get(`https://books.googleapis.com/books/v1/volumes?key=${googleBooksAPIKey}&q=${q}&maxResults=${maxResults}&startIndex=${startIndex}`)
}
