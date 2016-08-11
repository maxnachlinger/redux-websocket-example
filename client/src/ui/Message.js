import React from 'react'
export default (props) => (
  <li>
    <span>{props.nick}</span>
    <span>{props.createdAt}</span>
    <span>{props.message}</span>
  </li>
)
