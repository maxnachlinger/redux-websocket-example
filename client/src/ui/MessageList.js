import React from 'react'
import Message from './Message'

export default (props) => {
  const {messages} = props

  if(messages.length === 0) {
    return (
      <div>No messages</div>
    )
  }

  return (
    <div>{props.messages.map(m => (<Message {...m} />))}</div>
  )
}
