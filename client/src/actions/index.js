import * as config from '../../../common/config'
import * as actionTypes from '../actions/actionTypes'
import { emit } from './websocket'
const { messageTypes } = config

export function startUp () {
  // this is the redux-middleware package in action, dispatch and getState params are passed in
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
  return (dispatch, getState) => {
    const typing = getState().get('currentUserIsTyping')

    // if we're sending a message we're probably not also typing :)
    if (typing) {
      dispatch({ type: actionTypes.typingStopped })
      emit(messageTypes.userStoppedTyping)
    }

    dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.messageAdded, { message })
  }
}

export function typing () {
  const typingTimerLength = 400

  return (dispatch, getState) => {

    const typing = getState().get('currentUserIsTyping')
    // don't spam "typing" events and websocket messages
    if (!typing) {
      dispatch({ type: actionTypes.typingStarted })
      emit(messageTypes.userStartedTyping)
    }

    const lastTypingTime = Date.now()

    setTimeout(() => {
      const typing = getState().get('currentUserIsTyping')
      const timeDiff = Date.now() - lastTypingTime

      if (timeDiff >= typingTimerLength && typing) {
        dispatch({ type: actionTypes.typingStopped })
        emit(messageTypes.userStoppedTyping)
      }
    }, typingTimerLength)
  }
}
