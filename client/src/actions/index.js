import {
  joinRequested,
  messageAdded,
  usersRequested,
  userStartedTyping,
  userStoppedTyping,
} from "../../../common/message-types";
import {
  messageSendRequested,
  typingStarted,
  typingStopped,
} from "./actionTypes";

export const requestUsers = (send) => send(usersRequested);

export const join = (name) => (dispatch, getState, { send }) => {
  send(joinRequested, { name });
};

export const sendMessage = (message) => (dispatch, getState, { send }) => {
  const { currentUserIsTyping } = getState();

  // if we're sending a message we're probably not also typing :)
  if (currentUserIsTyping) {
    dispatch({ type: typingStopped });
    send(userStoppedTyping);
  }

  dispatch({ type: messageSendRequested });
  send(messageAdded, { message });
};

const typingTimerLength = 400;

export const typing = () => (dispatch, getState, { send }) => {
  const { currentUserIsTyping } = getState();
  // don't spam "typing" events and websocket messages
  if (!currentUserIsTyping) {
    dispatch({ type: typingStarted });
    send(userStartedTyping);
  }

  const lastTypingTime = Date.now();

  setTimeout(() => {
    const { currentUserIsTyping } = getState();
    const timeDiff = Date.now() - lastTypingTime;

    if (timeDiff >= typingTimerLength && currentUserIsTyping) {
      dispatch({ type: typingStopped });
      send(userStoppedTyping);
    }
  }, typingTimerLength);
};
