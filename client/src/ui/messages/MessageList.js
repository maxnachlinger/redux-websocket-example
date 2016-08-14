import React from 'react'
import Message from './Message'

export default (props) => {
  const { messages } = props

  if (messages.size === 0) {
    return (
      <div>
        <h2>Messages</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>Messages</h2>
      <ul>{props.messages.map(message => (<Message key={message.get('id')} message={message} />))}</ul>
    </div>
  )
}
