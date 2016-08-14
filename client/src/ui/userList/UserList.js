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
    <div>
      <h2>Users</h2>
      <ul>{users.map(user => (<User key={user.get('id')} user={user} />))}</ul>
    </div>
  )
}
