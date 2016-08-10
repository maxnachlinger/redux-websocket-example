import * as actionTypes from './actionTypes'
import * as config from '../../../common/config'

export function startUp () {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.connected
    })

    getState().socket.emit(config.messages.messages, {})
  }
}
