import React from 'react'
import dateformat from 'dateformat'

export default (props) => {
  const { message } = props
  const name = message.getIn('user.name')

  return (
    <li>
      <span>{dateformat(message.get('createdAt'), 'HH:MM:ss')}</span>
      <span>{name}</span>
      <span>{message.get('message')}</span>
    </li>
  )
}
