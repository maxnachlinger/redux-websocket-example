import React from 'react'
import dateformat from 'dateformat'
import Radium from 'radium'

const styles = {
  row: {
    fontSize: '0.5em'
  },
  name: {
    marginLeft: '5px'
  },
  text: {
    marginLeft: '5px',
    wordWrap: 'break-word'
  }
}

export default Radium((props) => {
  const { name, createdAt, message } = props

  let nameUi = null
  if (name) {
    nameUi = (
      <span style={styles.name}>{name}</span>
    )
  }

  return (
    <div style={styles.row}>
      <span>{dateformat(createdAt, 'HH:MM:ss')}</span>
      {nameUi}
      <span style={styles.text}>{message}</span>
    </div>
  )
})
