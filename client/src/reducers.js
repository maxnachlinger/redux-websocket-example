import { combineReducers } from 'redux'

function stuff (state = '', action) {
  return state
}

export default combineReducers({
  socket: (state = {}, action) => state,
  stuff
})
