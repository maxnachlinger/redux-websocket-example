/* global __DEV__ */
// the above tells the standard checker to ignore the fact that __DEV__ is not defined
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { List, Map } from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import App from './App'
import rootReducer from './reducers'
import { init as websocketInit } from './actions/websocket'

const initialState = new Map()
  .set('messages', new List())
  .set('users', new List())
  .set('userIdsTyping', new Map())
  .set('currentUser', new Map())
  .set('currentUserIsTyping', false)

function startUp () {
  const middleware = [ thunkMiddleware ]
  // use the logger in development mode - this is set in webpack.config.dev.js
  if (__DEV__) {
    middleware.push(createLogger())
  }

  const setup = applyMiddleware(...middleware)(createStore)

  const store = setup(rootReducer, initialState)
  websocketInit(store) // setup websocket listeners etc

  return store
}

ReactDOM.render(
  <Provider store={startUp()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
