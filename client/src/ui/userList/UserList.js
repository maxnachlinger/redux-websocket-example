import React from 'react'
import User from './User'

export default (props) => {
  const { users, userIdsTyping } = props

  if (users.size === 0) {
    return (
      <div>
        <h2>Users</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>{users.map(user => {
        const userId = user.get('id')
        return (< User
            key={ userId }
            userName={ user.get('name') }
            userIsTyping={ userIdsTyping.has(userId) }
          />
        )
      })}</ul>
    </div>
  )
}
