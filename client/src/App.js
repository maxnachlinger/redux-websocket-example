import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import MessageList from './ui/MessageList'
import UserList from './ui/UserList'
import JoinForm from './ui/JoinForm'
import SendMessageForm from './ui/SendMessageForm'

class App extends Component {
  constructor (props) {
    super(props)

    this.join = this.join.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.typing = this.typing.bind(this)
  }

  componentWillMount () {
    this.props.actions.startUp()
  }

  join (name) {
    this.props.actions.join(name)
  }

  sendMessage (message) {
    this.props.actions.sendMessage(message)
  }

  typing () {
    this.props.actions.typing()
  }

  render () {
    const { messages, users, currentUser } = this.props

    let form = (<JoinForm join={this.join} />)

    if (currentUser.size > 0) {
      form = (
        <SendMessageForm
          typing={this.typing}
          sendMessage={this.sendMessage} />
      )
    }

    return (
      <div>
        <MessageList messages={messages} />
        <UserList users={users} />
        {form}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    messages: state.get('messages'),
    users: state.get('users'),
    currentUser: state.get('currentUser')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch: dispatch,
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
