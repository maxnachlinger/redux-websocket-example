import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import App from './App'
import rootReducer from './reducers'
import { init } from './actions/websocket'

function startUp () {
  const setup = applyMiddleware(
    thunkMiddleware,
    createLogger()
  )(createStore)

  const store = setup(rootReducer, new Immutable.Map())
  init(store)

  return store
}

ReactDOM.render(
  <Provider store={startUp()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
