import React from 'react'
import dateformat from 'dateformat'
import Radium from 'radium'

const styles = {
  row: {
    fontSize: '0.5em'
  },
  userName: {
    marginLeft: '5px'
  },
  text: {
    marginLeft: '5px',
    wordWrap: 'break-word'
  }
}

export default Radium((props) => {
  const { message } = props
  const user = message.get('user')

  let nameUi = null
  if (user) {
    nameUi = (
      <span style={styles.userName}>{user.get('name')}</span>
    )
  }

  return (
    <div style={styles.row}>
      <span>{dateformat(message.get('createdAt'), 'HH:MM:ss')}</span>
      {nameUi}
      <span style={styles.text}>{message.get('message')}</span>
    </div>
  )
})
