// import axios from 'axios'
// import apiConfig from '../constants/config/apiConfig'
// import { auth } from './firebase/config'
// import { onAuthStateChanged } from 'firebase/auth'

// const getProfile = () => axios.get(`${apiConfig.baseUrl}/profile`).then(response => response.data)

// profile doc contains user's preferences and watchlist
const getProfile = () => {
  // return new Promise((resolve, reject) => {
  //   const unsubcribe = onAuthStateChanged(auth, user => {
  //     if (user) {
  //       resolve(user)
  //       unsubcribe()
  //     } else {
  //       reject(new Error('Error occured'))
  //     }
  //   })
  // }).then(user => {
  //   console.log(user)
  // })
}

export { getProfile }
