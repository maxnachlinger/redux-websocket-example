import React from 'react'

const Message = (props) => {
  const { message } = props
  return (
    <li>
      <span>{message.get('username')}</span>
      <span>{message.get('createdAt')}</span>
      <span>{message.get('message')}</span>
    </li>
  )
}

export default (props) => {
  const { messages } = props

  if (messages.size === 0) {
    return (
      <div>No messages</div>
    )
  }

  return (
    <ul>{props.messages.map(message => (<Message key={message.get('id')} message={message}/>))}</ul>
  )
}
