import React from 'react'
import Radium from 'radium'

const styles = {
  userName: {
    fontSize: '0.7em'
  }
}

export default Radium((props) => {
  const { userName, userIsTyping } = props

  // TODO - a nicer typing indicator is needed here :)
  let action = null
  if (userIsTyping) {
    action = ' (typing)'
  }

  return (
    <div style={styles.userName}>{userName} {action}</div>
  )
})
