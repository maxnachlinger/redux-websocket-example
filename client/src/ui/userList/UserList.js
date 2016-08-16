import React from 'react'
import Radium from 'radium'
import User from './User'

const styles = {
  title: {
    margin: '0 0 5px 0',
    fontSize: '1.0em'
  },
  list: {
    padding: '5px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '13.0em'
  }
}

export default Radium((props) => {
  const { users, userIdsTyping } = props
  let usersUi = null

  if (users.size > 0) {
    usersUi = users.map(user => {
      const userId = user.get('id')

      return (<User
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
