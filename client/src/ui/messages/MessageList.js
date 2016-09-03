import React from 'react'
import Radium from 'radium'
import Message from './Message'

const styles = {
  title: {
    margin: '0 0 5px 0',
    fontSize: '0.8em'
  },
  list: {
    margin: '4px',
    padding: '5px',
    border: '1px solid #8888bb',
    flex: '1 1 auto',
    order: 1,
    maxWidth: '80%'
  }
}

export default Radium((props) => {
  const { messages } = props
  let messageUi = null

  if (messages.size > 0) {
    messageUi = props.messages.map(message => (
      <Message
        key={message.get('id')}
        name={message.get('user').get('name')}
        createdAt={message.get('createdAt')}
        message={message.get('message')}
      />
    ))
  }

  return (
    <div style={styles.list}>
      <h2 style={styles.title}>Messages</h2>
      {messageUi}
    </div>
  )
})
