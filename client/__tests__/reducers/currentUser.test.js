import Immutable from 'immutable'
import expect from 'expect'
import * as config from '../../../common/config'
import * as actionTypes from '../../src/actions/actionTypes'
import { currentUser, currentUserIsTyping } from '../../src/reducers/currentUser'
const { messageTypes } = config

describe('reducers currentUser', () => {
  it(`should set currentUser to the payload of the ${messageTypes.joinRequested} message`, () => {
    const user = { id: 'test', name: 'test' }
    const nextState = currentUser(Immutable.fromJS({}), { type: messageTypes.joinRequested, payload: user })
    expect({
      id: nextState.get('id'),
      name: nextState.get('name')
    }).toEqual(user)
  })

  it(`should set currentUserIsTyping to true on receiving a ${actionTypes.typingStarted} message`, () => {
    const nextState = currentUserIsTyping(false, { type: actionTypes.typingStarted })
    expect(nextState).toBe(true)
  })

  it(`should set currentUserIsTyping to true on receiving a ${actionTypes.typingStopped} message`, () => {
    const nextState = currentUserIsTyping(true, { type: actionTypes.typingStopped })
    expect(nextState).toBe(false)
  })
})
