import React, { Component } from 'react'
import Radium from 'radium'

const styles = {
  form: {
    margin: 0
  }
}

class SendMessageForm extends Component {
  constructor (props) {
    super(props)

    this.onSendClick = this.onSendClick.bind(this)
    this.onTextareaKeyDown = this.onTextareaKeyDown.bind(this)
    this.onTextareaChange = this.onTextareaChange.bind(this)

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

  onTextareaChange (event) {
    const message = event.target.value
    const valid = message && message.length > 0
    this.setState({ valid, message })
  }

  onTextareaKeyDown (event) {
    this.props.typing()
  }

  render () {
    let submitDisabled = true
    if (this.state.valid) {
      submitDisabled = false
    }

    return (
      <div style={styles.form}>
        <textarea ref='messageInput' placeholder='Say something nice' maxLength='500'
          onChange={this.onTextareaChange} onKeyDown={this.onTextareaKeyDown}></textarea>
        <button onClick={this.onSendClick} disabled={submitDisabled}>Send</button>
      </div>
    )
  }
}

export default Radium(SendMessageForm)
