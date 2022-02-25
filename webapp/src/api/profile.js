import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const getProfile = () => axios.get(`${apiConfig.baseUrl}/profile`).then(response => response.data)

export { getProfile }
