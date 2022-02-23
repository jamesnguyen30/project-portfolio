import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'
// import qs from 'qs'

const createPost = data => axios.post(`${apiConfig.baseUrl}/createPost`, data)

export { createPost }
