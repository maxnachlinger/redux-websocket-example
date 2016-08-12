import React, { Component } from 'react'

export default class SendMessageForm extends Component {
  constructor (props) {
    super(props)

    this.onSendClick = this.onSendClick.bind(this)
    this.checkMessage = this.checkMessage.bind(this)

    this.typing = false
    this.checkTyping = this.checkTyping.bind(this)

    this.state = { valid: false, name: null }
  }

  onSendClick (event) {
    event.preventDefault()
    if (!this.state.valid) {
      return
    }
    this.props.sendMessage(this.refs.messageInput.value)
    this.refs.messageInput.value = ''
  }

  checkMessage (event) {
    const message = event.target.value
    const valid = message && message.length > 0
    this.setState({ valid, message })
  }

  checkTyping (event) {
    if (!this.typing) {
      this.typing = true
    }
    // TODO
  }

  render () {
    let submitDisabled = true
    if (this.state.valid) {
      submitDisabled = false
    }

    return (
      <div>
        <textarea ref='messageInput' placeholder='Say something nice' maxLength='500' onKeyDown={this.checkTyping} onChange={this.checkMessage}></textarea>
        <button onClick={this.onSendClick} disabled={submitDisabled}>Send</button>
      </div>
    )
  }
}
