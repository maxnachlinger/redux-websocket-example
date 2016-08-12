import React, { Component } from 'react'

export default class SendMessageForm extends Component {
  constructor (props) {
    super(props)

    this.onSendClick = this.onSendClick.bind(this)
    this.checkMessage = this.checkMessage.bind(this)

    this.state = { valid: false, name: null }
  }

  onSendClick (event) {
    event.preventDefault()
    if (!this.state.valid) {
      return
    }

    if (this.state.typing) {
      this.state.typing = false
      this.props.typingStopped()
    }

    this.props.sendMessage(this.refs.messageInput.value)
    this.refs.messageInput.value = ''
  }

  checkMessage (event) {
    const message = event.target.value
    const valid = message && message.length > 0
    this.setState({ valid, message })
  }

  render () {
    let submitDisabled = true
    if (this.state.valid) {
      submitDisabled = false
    }

    return (
      <div>
        <textarea ref='messageInput' placeholder='Say something nice' maxLength='500'
          onChange={this.checkMessage}></textarea>
        <button onClick={this.onSendClick} disabled={submitDisabled}>Send</button>
      </div>
    )
  }
}
