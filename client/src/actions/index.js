import * as actionTypes from './actionTypes'

export function startUp () {
  return dispatch => {
    dispatch({
      type: actionTypes.connected
    })
  }
}
