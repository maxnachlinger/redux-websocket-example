import React, { Component } from "react";
import Message from "./components/Message";
import { connect } from "preact-redux";

class MessageList extends Component {
  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    const { messages } = this.props;

    return (
      <div class="message-list">
        <strong>Messages</strong>
        <div
          class="messages-list"
          ref={(e) => {
            this.messageList = e;
          }}
        >
          {messages.map(({ id, user, message, createdAt }) => (
            <Message
              key={id}
              name={user && user.name}
              createdAt={createdAt}
              message={message}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(MessageList);
