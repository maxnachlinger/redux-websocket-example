import * as config from '../../../common/config'
import { emit } from './websocket'
const { messageTypes } = config

export function startUp () {
  return () => {
    emit(messageTypes.usersRequested)
  }
}

export function join (nick) {
  return () => {
    emit(messageTypes.joinRequested, { nick })
  }
}
