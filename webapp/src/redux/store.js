import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './reducers/authReducers'

// const initState = 0;

const rootReducer = combineReducers({
  authReducer
})

const composeEnhancer = composeWithDevTools({
  name: 'BookSocialApp'
})

const enhancers = composeEnhancer(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancers)

export default store
