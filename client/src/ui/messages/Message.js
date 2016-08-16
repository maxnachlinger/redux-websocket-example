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
  const name = message.get('user').get('name')

  return (
    <div style={styles.row}>
      <span>{dateformat(message.get('createdAt'), 'HH:MM:ss')}</span>
      <span style={styles.userName}>{name}</span>
      <span style={styles.text}>{message.get('message')}</span>
    </div>
  )
})
