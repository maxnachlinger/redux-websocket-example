import * as config from '../../../common/config'
import * as actionTypes from '../actions/actionTypes'
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
  return (dispatch) => {
    dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.messageAdded, { message })
  }
}

export function typing () {
  const typingTimerLength = 1000

  return (dispatch, getState) => {
    dispatch({ type: actionTypes.typingStarted })

    emit(messageTypes.userStartedTyping)
    const lastTypingTime = Date.now()

    setTimeout(() => {
      const typing = getState().get('typing')
      const timeDiff = Date.now() - lastTypingTime

      if (timeDiff >= typingTimerLength && typing) {
        dispatch({ type: actionTypes.typingStopped })
        emit(messageTypes.userStoppedTyping)
      }
    }, typingTimerLength);
  }
}
