import Immutable, { Map } from 'immutable'
import * as config from '../../../common/config'
import * as actionTypes from '../actions/actionTypes'
const { messageTypes } = config

const currentUser = (state = new Map(), action) => {
  if (action.type === messageTypes.joinRequested) {
    return Immutable.fromJS(action.payload)
  }
  return state
}

const currentUserIsTyping = (state = false, action) => {
  if (action.type === actionTypes.typingStarted) {
    return true
  }
  if (action.type === actionTypes.typingStopped) {
    return false
  }
  return state
}

export {
  currentUser,
  currentUserIsTyping
}
