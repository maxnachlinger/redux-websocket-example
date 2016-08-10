import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import io from 'socket.io-client'
import rootReducer from './reducers'

const socket = io('http://localhost:3000')

export default function () {
  const setup = applyMiddleware(
    thunkMiddleware,
    createLogger()
  )(createStore)
  return setup(rootReducer, {socket})
}
