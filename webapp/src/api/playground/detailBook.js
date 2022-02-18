import axios from 'axios'

const bookDetail = () =>
  axios.get('https://content-books.googleapis.com/books/v1/volumes/GNnxzQEACAAJ')
    .then(response => response)

export { bookDetail }
