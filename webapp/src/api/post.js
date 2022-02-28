import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const createPost = data => axios.post(`${apiConfig.baseUrl}/createPost`, data)

export { createPost }
