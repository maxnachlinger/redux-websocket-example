import React, { Component } from "react";
import { connect } from "preact-redux";
import { startUp } from "./actions";
import JoinForm from "./ui/JoinForm";
import SendMessageForm from "./ui/SendMessageForm";
import MessageList from "./ui/MessageList";
import UserList from "./ui/UserList";

const App = ({ currentUser }) => (
  <div>
    <div class="messages-and-users">
      <MessageList />
      <UserList />
    </div>
    {currentUser ? <SendMessageForm /> : <JoinForm />}
  </div>
);

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(App);
