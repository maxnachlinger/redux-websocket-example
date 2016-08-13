// the above tells the standard checker to ignore the fact that __DEV__ is not defined
import * as config from '../../../common/config'
import { emit } from './websocket'
const { messageTypes } = config

export function startUp () {
  // this is the redux-middleware package in action, the (currently unused) dispatch and getState params are passed in
  return (/* dispatch, getState */) => {
    emit(messageTypes.usersRequested)
  }
}

export function join (name) {
  return () => {
    emit(messageTypes.joinRequested, { name })
  }
}

export function sendMessage (message) {
  return () => {
    emit(messageTypes.messageAdded, { message })
  }
}

export function typing () {
  return () => {
    emit(messageTypes.userStartedTyping)
  }
}

export function typingStopped () {
  return () => {
    emit(messageTypes.userStoppedTyping)
  }
}
