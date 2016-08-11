import Immutable, { List } from 'immutable'
import { combineReducers } from 'redux-immutable'
import * as config from '../../common/config'
const { messageTypes } = config

const messages = (state = new List(), action) => {
  if (action.type === messageTypes.messageAdded) {
    return state.push(Immutable.fromJS(action.payload))
  }
  return state
}

const users = (state = new List(), action) => {
  if (action.type === messageTypes.usersRequested) {
    return Immutable.fromJS(action.payload || [])
  }
  // user joined / left - add/remove from users
  return state
}

export default combineReducers({
  messages,
  users
})
