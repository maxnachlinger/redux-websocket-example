import React, { Component } from 'react'
import Radium from 'radium'
import bind from 'lodash.bind'

const styles = {
  form: {
    margin: 0,
    width: '100%'
  }
}

class JoinForm extends Component {
  constructor (props) {
    super(props)
    this.onJoinClick = bind(this.onJoinClick, this)
    this.checkName = bind(this.checkName, this)
    this.state = { valid: false, name: null }
  }

  onJoinClick (event) {
    event.preventDefault()
    if (!this.state.valid) {
      return
    }
    this.props.join(this.refs.nameInput.value)
  }

  checkName (event) {
    const name = event.target.value
    const valid = name && name.length > 0
    this.setState({ valid, name })

    // if the enter key was pressed and the form is valid, submit it
    if (valid && event.type === 'keydown' && event.keyCode === 13) {
      this.props.join(name)
    }
  }

  render () {
    let submitDisabled = true
    if (this.state.valid) {
      submitDisabled = false
    }

    return (
      <div style={styles.form}>
        <input type='text' maxLength='20' placeholder='Your name' ref='nameInput' onKeyDown={this.checkName}
          onChange={this.checkName}
        />
        <button onClick={this.onJoinClick} disabled={submitDisabled}>Join</button>
      </div>
    )
  }
}

export default Radium(JoinForm)
