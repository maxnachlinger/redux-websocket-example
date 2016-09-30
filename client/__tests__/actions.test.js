import * as config from '../../common/config'
import * as actions from '../src/actions'
import expect from 'expect'
const { messageTypes } = config

describe('actions', () => {
  it('should send a message requesting users on startUp()', () => {
    const emit = (type) => {
      expect(type).toEqual(messageTypes.usersRequested)
    }
    actions.startUp()(() => {}, () => {}, { emit })
  })

  it('should send a message with a username to join on join()', () => {
    const name = 'test'
    const emit = (type, payload) => {
      expect(type).toEqual(messageTypes.joinRequested)
      expect(payload).toEqual({ name })
    }
    actions.join(name)(() => {}, () => {}, { emit })
  })
})
