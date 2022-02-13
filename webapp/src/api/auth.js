import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

// const login = (data) => axios.post(`${apiConfig.baseUurl}/login`, data).then((response) => response.data)
const signUp = (email, password) => axios.post(`${apiConfig.baseUrl}/signUp`, { email: email, password: password })
  .then((response) => response.data)

export { signUp }
