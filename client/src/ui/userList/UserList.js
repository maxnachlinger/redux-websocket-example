import React from 'react'
import User from './User'

export default (props) => {
  const { users, userIdsTyping } = props
  let usersUi = null

  if (users.size > 0) {
    usersUi = users.map(user => {
      const userId = user.get('id')

      return (< User
          key={userId}
          userName={user.get('name')}
          userIsTyping={userIdsTyping.has(userId)}
        />
      )
    })
  }

  return (
    <div className='user-list'>
      <h2>Users</h2>
      <ul>{usersUi}</ul>
    </div>
  )
}
