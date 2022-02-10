import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import authReducer from './reducers/authReducers'

// const initState = 0;

// const counterReducer = (type, state = initState) => {
//   switch (type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
})

const composeEnhancer = composeWithDevTools({
  name: 'BookSocialApp'
})

const enhancers = composeEnhancer(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancers)

export default store
