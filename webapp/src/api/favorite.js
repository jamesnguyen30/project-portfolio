import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const saveFavorite = bookId => axios.post(`${apiConfig.baseUrl}/favorite`, { bookid: bookId }).then(response => response.data)
const deleteFavorite = bookId => axios.post(`${apiConfig.baseUrl}/unfavorite`, { bookid: bookId }).then(response => response.data)

export { saveFavorite, deleteFavorite }
