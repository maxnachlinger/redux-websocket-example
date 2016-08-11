import React, {Component} from 'react'

export default class JoinForm extends Component {
  render() {
    const { onJoin } = this.props

    return (
      <div>
        <form>
          <input type="text" maxLength="14"/>
          <button type="Submit">Submit</button>
        </form>
      </div>
    )
  }
}
