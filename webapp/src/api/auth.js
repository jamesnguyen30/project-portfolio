import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'

// const login = (data) => axios.post(`${apiConfig.baseUurl}/login`, data).then((response) => response.data)
const signUp = (email, password) => axios.post(`${apiConfig.baseUrl}/signUp`, { email: email, password: password })
  .then((response) => response.data)

const signIn = (email, password) => axios.post(`${apiConfig.baseUrl}/signIn`, { email: email, password: password })
  .then((response) => response.data)

const signOut = () => axios.get(`${apiConfig.baseUrl}/signOut`).then(response => response.data)

const checkSignin = () => axios.get(`${apiConfig.baseUrl}/isSignedIn`)

const checkAuthorization = (idToken) => axios.post(`${apiConfig.baseUrl}/authorize`, { idToken: idToken })

export { signUp, signIn, signOut, checkSignin, checkAuthorization }
