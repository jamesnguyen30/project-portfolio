import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

console.log(apiConfig.baseUrl)
const healthCheck = () => axios.get(`${apiConfig.baseUrl}/healthCheck`)
  .then((response) => response.data)
  .catch(err => console.log('err' + err))

export { healthCheck }
