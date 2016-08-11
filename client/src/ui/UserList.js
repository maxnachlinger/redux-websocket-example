import React from 'react'
import User from './User'

export default (props) => {
  const { users } = props

  if (users.size === 0) {
    return (
      <ul>
        <li>No one is here yet.</li>
      </ul>
    )
  }

  return (
    <ul>{users.map(user => (<User key={user.get('nick')} user={user} />))}</ul>
  )
}
