import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'App/redux/rootReducer';

const hasReduxDevTools = typeof window !== 'undefined' && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer = hasReduxDevTools 
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
  : compose

const configureStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(
      applyMiddleware(thunk)
    )
  )
};

export default configureStore;