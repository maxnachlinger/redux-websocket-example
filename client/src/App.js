import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import MessageList from './ui/MessageList'
import UserList from './ui/UserList'
import JoinForm from './ui/JoinForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.onJoin = this.onJoin.bind(this)
  }

  componentWillMount () {
    this.props.actions.startUp()
  }

  onJoin (nick) {
    this.props.actions.join(nick)
  }

  render () {
    const { messages, users, currentUser } = this.props

    let joinForm = (<JoinForm onJoin={this.onJoin}/>)
    if (currentUser.size > 0) {
      joinForm = null
    }

    return (
      <div>
        <MessageList messages={messages}/>
        <UserList users={users}/>
        {joinForm}
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
