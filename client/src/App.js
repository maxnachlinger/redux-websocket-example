import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import MessageList from './ui/MessageList'
import UserList from './ui/UserList'

class App extends Component {
  componentWillMount () {
    this.props.actions.startUp()
  }

  render () {
    const { messages, users } = this.props
    return (
      <div>
        <MessageList messages={messages} />
        <UserList users={users} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return Object.assign({}, state)
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
