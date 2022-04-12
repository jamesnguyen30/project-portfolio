const ID_TOKEN_KEY = 'idToken'

const saveItem = (key, value) => {
  localStorage.setItem(key, value)
}

const getItem = (key) => {
  return localStorage.getItem(key)
}

const saveIdToken = idToken => {
  saveItem(ID_TOKEN_KEY, idToken)
}

const getIdToken = () => {
  return getItem(ID_TOKEN_KEY)
}

export { saveIdToken, getIdToken }
