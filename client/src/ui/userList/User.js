import React from 'react'

export default (props) => {
  const { userName, userIsTyping } = props

  // TODO - a nicer typing indicator is needed here :)
  let action = null
  if (userIsTyping) {
    action = ' (typing)'
  }

  return (
    <li>
      <span>{userName}{action}</span>
    </li>
  )
}
