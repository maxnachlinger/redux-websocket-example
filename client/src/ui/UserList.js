import React from 'react'

const User = (props) => {
  return (
    <li>
      <span>{props.user.get('name')}</span>
    </li>
  )
}

export default (props) => {
  const { users } = props

  if (users.size === 0) {
    return (
      <ul>
        <li>No one is here yet.</li>
      </ul>
    )
  }

  return (
    <ul>{users.map(user => (<User key={user.get('id')} user={user}/>))}</ul>
  )
}
