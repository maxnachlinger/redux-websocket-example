import React, { Component } from "react";
import { connect } from "preact-redux";
import { join } from "../actions";

class JoinForm extends Component {
  constructor(props) {
    super(props);
    this.onJoinClick = this.onJoinClick.bind(this);
    this.checkName = this.checkName.bind(this);
    this.state = { valid: false, name: null };
  }

  onJoinClick(event) {
    event.preventDefault();
    if (!this.state.valid) {
      return;
    }
    this.props.joinFn(this.nameInput.value);
  }

  checkName(event) {
    const name = event.target.value;
    const valid = name && name.length > 0;
    this.setState({ valid, name });

    // if the enter key was pressed and the form is valid, submit it
    if (valid && event.type === "keydown" && event.keyCode === 13) {
      this.props.joinFn(name);
    }
  }

  render() {
    let submitDisabled = true;
    if (this.state.valid) {
      submitDisabled = false;
    }

    return (
      <div>
        <input
          type="text"
          maxLength="20"
          placeholder="Your name"
          onKeyDown={this.checkName}
          onChange={this.checkName}
          ref={(c) => (this.nameInput = c)}
        />
        <button onClick={this.onJoinClick} disabled={submitDisabled}>
          Join
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  joinFn: (name) => dispatch(join(name)),
});

export default connect(
  null,
  mapDispatchToProps,
)(JoinForm);
