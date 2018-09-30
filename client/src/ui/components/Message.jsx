import React from "react";

const timeSince = (date) => {
  const elapsed = Date.now() - date;
  if (elapsed < 5000) {
    return "just now";
  }

  const seconds = Math.floor(elapsed / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " yrs ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " mon ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hr ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " min ago";
  }

  return Math.floor(seconds) + " sec ago";
};

const Message = ({ name, createdAt, message }) => (
  <div class="message">
    <span style={name && { marginRight: "5px" }}>{name && name + ":"}</span>
    <span class="text">{message}</span>
    <span class="created-at">{timeSince(createdAt)}</span>
  </div>
);

export default Message;
