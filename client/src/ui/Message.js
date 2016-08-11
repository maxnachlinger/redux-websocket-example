import React from 'react'
export default (props) => (
  <div>
    <span>{props.nick}</span>
    <span>{props.createdAt}</span>
    <span>{props.message}</span>
  </div>
)
