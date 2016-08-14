import Immutable, { List } from 'immutable'
import * as config from '../../../common/config'
const { messageTypes } = config

const users = (state = new List(), action) => {
  const mapping = {
    [messageTypes.usersRequested]: (state, action) => Immutable.fromJS(action.payload),
    [messageTypes.joinRequested]: (state, action) => state.push(Immutable.fromJS(action.payload))
      .sort((user0, user1) => user0.get('name').localeCompare(user1.get('name'))),
    [messageTypes.userLeft]: (state, action) => state.filter((user) => user.get('id') !== action.payload.id)
  }

  const handler = mapping[ action.type ]
  if (handler) {
    return handler(state, action)
  }

  return state
}

export {
  users
}
