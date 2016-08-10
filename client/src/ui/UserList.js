import React from 'react'
import User from './User'

export default (props) => {
  const users = props.users.map(u => (<User {...u} />))
  return (
    <div>{users}</div>
  )
}
