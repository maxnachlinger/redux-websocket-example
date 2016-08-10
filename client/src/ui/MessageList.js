import React from 'react'
import Message from './Message'

export default (props) => {
  const messages = props.messages.map(m => (<Message {...m} />))
  return (
    <div>{messages}</div>
  )
}
