import React, { Component } from 'react'

export default class JoinForm extends Component {
  constructor (props) {
    super(props)
    this.onJoinClick = this.onJoinClick.bind(this)
    this.checkNick = this.checkNick.bind(this)
    this.state = { valid: false, nick: null }
  }

  onJoinClick (event) {
    event.preventDefault();
    if (!this.state.valid) {
      return;
    }
    this.props.onJoin(this.refs.nickInput.value)
  }

  checkNick (event) {
    const nick = event.target.value
    const valid = nick && nick.length > 0
    this.setState({ valid, nick })

    // if the enter key was pressed and the form is valid, submit it
    if (!valid || event.type !== 'keydown' || event.keyCode !== 13) {
      return
    }

    this.props.onJoin(nick)
  }

  render () {
    let submitDisabled = true
    if (this.state.valid) {
      submitDisabled = false
    }

    return (
      <div>
        <input type="text" maxLength="14" placeholder="Your name" ref="nickInput"
               onKeyDown={this.checkNick} onChange={this.checkNick}/>
        <button onClick={this.onJoinClick} disabled={submitDisabled}>Join</button>
      </div>
    )
  }
}
