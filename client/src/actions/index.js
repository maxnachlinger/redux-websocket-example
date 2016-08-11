import * as config from '../../../common/config'
import {emit} from './websocket'
const { messageTypes } = config

export function startUp () {
  return (dispatch, getState) => {
    emit(messageTypes.usersRequested)
  }
}
