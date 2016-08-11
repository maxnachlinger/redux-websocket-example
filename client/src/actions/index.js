import * as actionTypes from './actionTypes'
// shared config is
import * as config from '../../../common/config'
const {messageTypes} = config

export function startUp () {
  return (dispatch, getState) => {
    const socket = getState().socket

    // add listeners to socket messages so we can re-dispatch them as actions
    Object.keys(messageTypes)
      .forEach(type => socket.on(type, (payload) => dispatch({ type, payload })))

    socket.emit(messageTypes.getUsers)
    socket.emit(messageTypes.getMessages)

    dispatch({
      type: actionTypes.connected
    })
  }
}
