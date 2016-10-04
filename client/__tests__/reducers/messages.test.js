import {List} from 'immutable'
import expect from 'expect'
import {messageTypes} from '../../../common/config'
import { messages } from '../../src/reducers/messages'

describe('reducers: messages', () => {
  it(`should add the payload of the ${messageTypes.messageAdded} message to the state`, () => {
    const message = { id: 'test', message: 'test' }
    const nextState = messages(new List(), { type: messageTypes.messageAdded, payload: message })

    const newMessage = nextState.toJS().pop()
    expect(newMessage).toEqual(message)
  })
})
