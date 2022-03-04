import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const saveFavorite = bookId => axios.post(`${apiConfig.baseUrl}/favorite`, { bookid: bookId }).then(response => response.data)

export { saveFavorite }
