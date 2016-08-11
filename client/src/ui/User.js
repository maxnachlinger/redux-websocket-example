import React from 'react'
export default (props) => {
  return (
    <li>
      <span>{props.user.get('nick')}</span>
    </li>
  )
}
