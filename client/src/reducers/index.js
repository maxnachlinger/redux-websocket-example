import { combineReducers } from 'redux-immutable'
import { currentUser, currentUserIsTyping } from './currentUser'
import { users } from './users'
import { messages } from './messages'

export default combineReducers({
  messages,
  users,
  currentUser,
  currentUserIsTyping
})
