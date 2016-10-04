import Immutable, {Map} from 'immutable'
import expect from 'expect'
import {messageTypes} from '../../../common/config'
import { userIdsTyping, users } from '../../src/reducers/users'

describe('reducers: userIdsTyping', () => {
  it(`should add the payload of the ${messageTypes.userStartedTyping} message to the state`, () => {
    const userId = 'test'
    const nextState = userIdsTyping(new Map(), { type: messageTypes.userStartedTyping, payload: { userId } })

    const newState = nextState.toJS()
    expect(newState).toEqual({[userId]: true})
  })
})
