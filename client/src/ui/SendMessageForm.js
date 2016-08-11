import React, { Component } from 'react'

export default class SendMessageForm extends Component {
  constructor (props) {
    super(props)
    this.onSendClick = this.onSendClick.bind(this)
    this.checkMessage = this.checkMessage.bind(this)
    this.state = { valid: false, name: null }
  }

  onSendClick (event) {
    event.preventDefault();
    if (!this.state.valid) {
      return;
    }
    this.props.sendMessage(this.refs.messageInput.value)
  }

  checkMessage (event) {
    const message = event.target.value
    const valid = message && message.length > 0
    this.setState({ valid, message })

    // if the enter key was pressed and the form is valid, submit it
    if (valid && event.type === 'keydown' && event.keyCode === 13) {
      this.props.sendMessage(message)
    }
  }

  render () {
    let submitDisabled = true
    if (this.state.valid) {
      submitDisabled = false
    }

    return (
      <div>
        <input type="text" maxLength="14" placeholder="Say something nice" ref="messageInput"
               onKeyDown={this.checkMessage} onChange={this.checkMessage}/>
        <button onClick={this.onSendClick} disabled={submitDisabled}>Send</button>
      </div>
    )
  }
}
