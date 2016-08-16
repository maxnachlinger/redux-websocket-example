import React from 'react'
import Message from './Message'

export default (props) => {
  const { messages } = props
  let messageUi = null

  if (messages.size > 0) {
    messageUi = props.messages.map(message => (
      <Message key={message.get('id')} message={message} />
    ))
  }

  return (
    <div className='message-list'>
      <h2>Messages</h2>
      <ul>{messageUi}</ul>
    </div>
  )
}
