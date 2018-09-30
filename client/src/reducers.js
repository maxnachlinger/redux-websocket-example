import {
  joinRequested,
  messageAdded,
  userJoined,
  userLeft,
  usersRequested,
  userStartedTyping,
  userStoppedTyping,
} from "../../common/message-types";
import { typingStarted, typingStopped } from "./actions/actionTypes";

const handlers = {
  [joinRequested]: ({ state, payload: currentUser }) => ({
    ...state,
    currentUser,
  }),
  // Note: currentUser is already in users
  [userJoined]: ({ state, payload: user }) => ({
    ...state,
    users: state.users.concat([user]),
  }),
  [typingStarted]: ({ state }) => ({
    ...state,
    currentUserIsTyping: true,
  }),
  [typingStopped]: ({ state }) => ({
    ...state,
    currentUserIsTyping: false,
  }),
  [messageAdded]: ({ state, payload: message, metadata: { createdAt } }) => ({
    ...state,
    messages: state.messages.concat([{ ...message, createdAt }]),
  }),
  [usersRequested]: ({ state, payload: users }) => ({
    ...state,
    users,
  }),
  [userLeft]: ({ state, payload: { userId } }) => ({
    ...state,
    users: state.users.filter(({ id }) => id !== userId),
  }),
  [userStartedTyping]: ({ state, payload: { userId } }) => ({
    ...state,
    userIdsTyping: {
      ...state.userIdsTyping,
      [userId]: true,
    },
  }),
  [userStoppedTyping]: ({ state, payload: { userId } }) => ({
    ...state,
    userIdsTyping: Object.keys(state.userIdsTyping)
      .filter((key) => key !== userId.toString())
      .reduce((accum, key) => ({ ...accum, [key]: true }), {}),
  }),
};

export default (state = {}, { type, payload, metadata }) => {
  const handler = handlers[type];
  if (handler) {
    return handler({ state, payload, metadata });
  }

  return state;
};
