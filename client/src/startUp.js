import Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import {init} from './actions/websocket'

export default function () {
  const setup = applyMiddleware(
    thunkMiddleware,
    createLogger()
  )(createStore)

  const store = setup(rootReducer, new Immutable.Map())
  init(store)

  return store
}
