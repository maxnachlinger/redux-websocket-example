import React from 'react'
export default (props) => (
  <div>
    <span>{props.online ? '*' : null}</span>
    <span>{props.nick}</span>
  </div>
)
