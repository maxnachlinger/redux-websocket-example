import * as config from '../../../common/config'
import { emit } from './websocket'
const { messageTypes } = config

export function startUp () {
  return () => {
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

export function typing() {
  return () => {
    emit(messageTypes.userStartedTyping)
  }
}

export function typingStopped() {
  return () => {
    emit(messageTypes.userStoppedTyping)
  }
}
