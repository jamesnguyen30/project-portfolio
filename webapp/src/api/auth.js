import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

const login = (data) => axios.post(`${apiConfig.baseUurl}/login`, data).then((response) => response.data)

export default { login }
