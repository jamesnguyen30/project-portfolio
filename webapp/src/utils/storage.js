const ID_TOKEN_KEY = 'idToken'

const saveItem = (key, value) => {
  localStorage.setItem(key, value)
  console.log('set id token')
}

const getItem = (key) => {
  return localStorage.getItem(key)
}

const removeItem = (key) => {
  localStorage.removeItem(key)
}

const saveIdToken = idToken => {
  saveItem(ID_TOKEN_KEY, idToken)
}

const getIdToken = () => {
  return getItem(ID_TOKEN_KEY)
}

const removeIdToken = () => {
  return removeItem(ID_TOKEN_KEY)
}

export { saveIdToken, getIdToken, removeIdToken }
