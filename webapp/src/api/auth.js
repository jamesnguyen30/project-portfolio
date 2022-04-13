import axios from 'axios'
import { apiConfig } from '../constants/config/apiConfig'
import { auth } from './firebase/config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignout } from 'firebase/auth'
import { removeIdToken } from '../utils/storage'

const checkSignin = () => axios.get(`${apiConfig.baseUrl}/isSignedIn`)

const checkAuthorization = () => axios.get(`${apiConfig.baseUrl}/isSignedIn`, apiConfig.requestConfig)

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
    return userCredentials.user.getIdToken()
  })
}

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then(async userCredentials => {
    return userCredentials.user.getIdToken()
  })
}

const signOut = () => {
  const uid = auth.currentUser.uid
  return axios.post(`${apiConfig.baseUrl}/revokeToken`, { uid: uid }).then(_ => {
    removeIdToken()
    return firebaseSignout(auth)
  })
}

export { signUp, signIn, signOut, checkSignin, checkAuthorization }
