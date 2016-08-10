import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'

class App extends Component {
  componentWillMount () {
    this.props.actions.startUp()
  }

  render () {
    return (
      <div>hello</div>
    )
  }
}

function mapStateToProps (state) {
  return {
    store: state
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
