import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'
// import qs from 'qs'

const createPost = data =>
  axios.post(`${apiConfig.baseUrl}/createPost`, data)
// axios(
  //   {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //     data: qs.stringify(data),
  //     url: `${apiConfig.baseUrl}/createPost`
  //   })
  //   .then(response => response)

export { createPost }
