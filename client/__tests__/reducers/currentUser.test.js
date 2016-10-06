import Immutable from 'immutable'
import expect from 'expect'
import { messageTypes } from '../../../common/config'
import { typingStarted, typingStopped } from '../../src/actions/actionTypes'
import { currentUser, currentUserIsTyping } from '../../src/reducers/currentUser'

describe('reducers: currentUser', () => {
  it(`should set state to the payload of the ${messageTypes.joinRequested} message`, () => {
    const user = { id: 'test', name: 'test' }
    const nextState = currentUser(Immutable.fromJS({}), { type: messageTypes.joinRequested, payload: user })
    expect({
      id: nextState.get('id'),
      name: nextState.get('name')
    }).toEqual(user)
  })
})

describe('reducers: currentUserIsTyping', () => {
  it(`should set state to true on receiving a ${typingStarted} message`, () => {
    const nextState = currentUserIsTyping(false, { type: typingStarted })
    expect(nextState).toBe(true)
  })

  it(`should set state to false on receiving a ${typingStopped} message`, () => {
    const nextState = currentUserIsTyping(true, { type: typingStopped })
    expect(nextState).toBe(false)
  })
})
