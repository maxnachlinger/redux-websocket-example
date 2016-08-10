import { combineReducers } from 'redux'

function messages (state = [], action) {
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
