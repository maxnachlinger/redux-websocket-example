import React from 'react'
import Message from './Message'

export default (props) => {
  const {messages} = props

  if(messages.size === 0) {
    return (
      <div>No messages</div>
    )
  }

  return (
    <ul>{props.messages.map(m => (<Message {...m} />))}</ul>
  )
}
