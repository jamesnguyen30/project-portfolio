import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './reducers/authReducers'
import profileReducer from './reducers/profileReducer'
import watchlistReducer from './reducers/watchlistReducer'
import newsReducer from './reducers/newsReducers'

const rootReducer = combineReducers({
  authReducer,
  profileReducer,
  watchlistReducer,
  newsReducer
})

const composeEnhancer = composeWithDevTools({
  name: 'NewsApp'
})

const enhancers = composeEnhancer(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancers)

export default store
