import { combineReducers } from 'redux'
import * as config from '../../common/config'
const { messageTypes } = config

function messages (state = [], action) {
  if (action.type === messageTypes.getMessages) {
    state = action.payload;
  }
  return state
}

function users (state = [], action) {
  return state
}

export default combineReducers({
  socket: (state = {}, action) => state,
  messages,
  users
})
