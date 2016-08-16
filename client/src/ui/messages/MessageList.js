import React from 'react'
import Radium from 'radium'
import Message from './Message'

const styles = {
  title: {
    margin: '0 0 5px 0',
    fontSize: '1.0em'
  },
  messageList: {
    boxSizing: 'border-box',
    marginRight: '13.0em',
    minWidth: '175px'
  }
}

export default Radium((props) => {
  const { messages } = props
  let messageUi = null

  if (messages.size > 0) {
    messageUi = props.messages.map(message => (
      <Message key={message.get('id')} message={message}/>
    ))
  }

  return (
    <div style={styles.messageList}>
      <h2 style={styles.title}>Messages</h2>
      {messageUi}
    </div>
  )
})
