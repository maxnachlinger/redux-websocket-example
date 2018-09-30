import React, { Component } from "react";
import { sendMessage, typing } from "../actions";
import { connect } from "preact-redux";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);

    this.onSendClick = this.onSendClick.bind(this);
    this.onTextareaKeyDown = this.onTextareaKeyDown.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.state = { valid: false, name: null };
  }

  onSendClick(event) {
    event.preventDefault();
    if (!this.state.valid) {
      return;
    }

    if (this.state.typing) {
      this.state.typing = false;
    }

    this.props.sendMessageFn(this.messageInput.value);
    this.messageInput.value = "";
  }

  onTextareaChange(event) {
    const message = event.target.value;
    const valid = message && message.length > 0;
    this.setState({ valid, message });
  }

  onTextareaKeyDown() {
    this.props.typingFn();
  }

  render() {
    let submitDisabled = true;
    if (this.state.valid) {
      submitDisabled = false;
    }

    return (
      <div>
        <textarea
          ref={(c) => (this.messageInput = c)}
          placeholder="Say something nice"
          maxLength="500"
          rows="2"
          cols="40"
          onChange={this.onTextareaChange}
          onKeyDown={this.onTextareaKeyDown}
        />
        <button onClick={this.onSendClick} disabled={submitDisabled}>
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
