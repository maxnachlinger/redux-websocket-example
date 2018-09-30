import React from "react";

// TODO - a nicer typing indicator is needed here :)
const User = ({ name, typing }) => (
  <div>
    {name} {typing && " (typing)"}
  </div>
);

export default User;
