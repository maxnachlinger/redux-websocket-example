import React, { Component } from "react";
import { sendMessage, typing } from "../actions";
import { connect } from "preact-redux";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);

    this.onSendClick = this.onSendClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { valid: false, name: null };
  }

  onSendClick(event) {
    event.preventDefault();
    const { message, valid, typing } = this.state;
    if (!valid || !message || message.length === 0) {
      return;
    }

    if (typing) {
      this.state.typing = false;
    }

    this.props.sendMessageFn(this.messageInput.value);
    this.messageInput.value = "";
    this.setState({ valid: false, message: "" });
  }

  onChange(event) {
    const message = event.target.value;
    const valid = message && message.length > 0;
    this.setState({ valid, message });
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      return this.onSendClick(event);
    }
    this.props.typingFn();
  }

  render() {
    const { valid } = this.state;

    return (
      <div>
        <input
          class="send-message-form-input"
          ref={(c) => (this.messageInput = c)}
          placeholder="Say something nice"
          maxLength="200"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <button onClick={this.onSendClick} disabled={!valid}>
          Send
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMessageFn: (message) => dispatch(sendMessage(message)),
  typingFn: () => dispatch(typing()),
});

export default connect(
  null,
  mapDispatchToProps,
)(SendMessageForm);
