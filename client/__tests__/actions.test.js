import Immutable from 'immutable'
import expect from 'expect'
import * as config from '../../common/config'
import * as actions from '../src/actions'
const { messageTypes } = config

const getStateStub = (state) => () => Immutable.fromJS(state || {})

describe('actions', () => {
  it(`should emit a ${messageTypes.usersRequested} message on startUp()`, () => {
    const emit = (type) => {
      expect(type).toEqual(messageTypes.usersRequested)
    }
    actions.startUp()(() => {}, getStateStub(), { emit })
  })

  it(`should emit a ${messageTypes.joinRequested} message with a username on join()`, () => {
    const name = 'test'
    const emit = (type, payload) => {
      expect(type).toEqual(messageTypes.joinRequested)
      expect(payload).toEqual({ name })
    }
    actions.join(name)(() => {}, getStateStub(), { emit })
  })

  it(`should emit a ${messageTypes.messageAdded} message with a message on sendMessage()`, () => {
    const message = 'test'
    const emit = (type, payload) => {
      expect(type).toEqual(messageTypes.messageAdded)
      expect(payload).toEqual({ message })
    }
    actions.sendMessage(message)(() => {}, getStateStub(), { emit })
  })

  it(`should emit a ${messageTypes.userStoppedTyping} message when sendMessage() is called and the user is typing`, () => {
    const message = 'test'

    const emittedMessages = []
    const emit = (type, payload) => emittedMessages.push({type, payload})

    actions.sendMessage(message)(() => {}, getStateStub({currentUserIsTyping: true}), { emit })
    expect(emittedMessages).toInclude({type: messageTypes.userStoppedTyping, payload: undefined})
  })

})
