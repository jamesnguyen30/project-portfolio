import axios from 'axios'
import apiConfig from '../constants/config/apiConfig'
import { auth } from './firebase/config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignout } from 'firebase/auth'

// const login = (data) => axios.post(`${apiConfig.baseUurl}/login`, data).then((response) => response.data)
// const signUp = (email, password) => axios.post(`${apiConfig.baseUrl}/signUp`, { email: email, password: password })
//   .then((response) => response.data)

// const signIn = (email, password) => axios.post(`${apiConfig.baseUrl}/signIn`, { email: email, password: password })
//   .then((response) => response.data)

// const signOut = () => axios.get(`${apiConfig.baseUrl}/signOut`).then(response => response.data)

const checkSignin = () => axios.get(`${apiConfig.baseUrl}/isSignedIn`)

const checkAuthorization = () => axios.get(`${apiConfig.baseUrl}/isSignedIn`, apiConfig.requestConfig)

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
    return userCredentials.user.getIdToken()
  })
}

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
    return userCredentials.user.getIdToken()
  })
}

const signOut = () => {
  return firebaseSignout(auth)
}

export { signUp, signIn, signOut, checkSignin, checkAuthorization }
