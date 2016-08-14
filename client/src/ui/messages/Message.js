import React from 'react'
import dateformat from 'dateformat'

export default (props) => {
  const { message } = props

  return (
    <li>
      <span>{dateformat(message.get('createdAt'), 'HH:MM:ss')}</span>
      <span>{message.get('username')}</span>
      <span>{message.get('message')}</span>
    </li>
  )
}
