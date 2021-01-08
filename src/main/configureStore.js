import {createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'

export default function configureStore (initialState) {
  const middleWares = location.hostname.startsWith('localhost') ?  [thunk, reduxImmutableStateInvariant()]: [thunk]
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleWares)
  )
}
