import Immutable, { List } from 'immutable'
import * as config from '../../../common/config'
const { messageTypes } = config

const messages = (state = new List(), action) => {
  if (action.type === messageTypes.messageAdded) {
    return state.push(Immutable.fromJS(action.payload))
  }
  return state
}

export {
  messages
}
