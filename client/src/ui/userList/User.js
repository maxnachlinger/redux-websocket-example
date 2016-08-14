import React from 'react'

export default (props) => {
  const { userName, userIsTyping } = props

  // TODO - a nicer typing indicator is needed here :)
  let typing = null
  if (userIsTyping) {
    typing = ' ...'
  }

  return (
    <li>
      <span>{userName}{typing}</span>
    </li>
  )
}
