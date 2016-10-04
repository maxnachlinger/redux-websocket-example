import { Map, List } from 'immutable'
import expect from 'expect'
import {messageTypes} from '../../../common/config'
import { userIdsTyping, users } from '../../src/reducers/users'

describe('reducers: userIdsTyping', () => {
  it(`should add the payload of the ${messageTypes.userStartedTyping} message to the state`, () => {
    const userId = 'test-id'
    const nextState = userIdsTyping(new Map(), { type: messageTypes.userStartedTyping, payload: { userId } })

    const newState = nextState.toJS()
    expect(newState).toEqual({[userId]: true})
  })
})

describe('reducers: users', () => {
  it(`should set the state to the payload of the ${messageTypes.usersRequested} message`, () => {
    const input = [{id: 'test-id', name: 'test-name'}]
    const nextState = users(new List(), { type: messageTypes.usersRequested, payload: input })

    const newState = nextState.toJS()
    expect(newState).toEqual(input)
  })
})
