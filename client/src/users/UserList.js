import React from 'react'
import Radium from 'radium'
import User from './User'

const styles = {
  title: {
    margin: '0 0 5px 0',
    fontSize: '0.8em'
  },
  list: {
    margin: '4px',
    padding: '5px',
    border: '1px solid #8888bb',
    flex: '0 1 auto',
    order: 1,
    minWidth: '210px',
    maxWidth: '20%'
  }
}

export default Radium((props) => {
  const { users, userIdsTyping } = props
  let usersUi = null

  if (users.size > 0) {
    usersUi = users.map(user => {
      const userId = user.get('id')

      return (
        <User
          key={userId}
          userName={user.get('name')}
          userIsTyping={userIdsTyping.has(userId)}
        />
      )
    })
  }

  return (
    <div style={styles.list}>
      <h2 style={styles.title}>Users</h2>
      {usersUi}
    </div>
  )
})
