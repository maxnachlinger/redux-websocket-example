const {
  typingStarted,
  typingStopped,
} = require("../../client/src/actions/actionTypes");
const { default: rootReducer } = require("../../client/src/reducers");
const {
  joinRequested,
  userJoined,
  messageAdded,
  usersRequested,
  userLeft,
  userStartedTyping,
  userStoppedTyping,
} = require("../../common/message-types");

describe("reducers", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Handles unknown actions", () => {
    const initialState = { test: true };
    const newState = rootReducer(initialState, {});

    expect(newState).toBeTruthy();
    expect(newState).toEqual(initialState);
  });

  it("Sets currentUser on joinRequested action", () => {
    const joinedUser = { id: 0, name: "test" };
    const newState = rootReducer(
      {},
      { type: joinRequested, payload: joinedUser },
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ currentUser: joinedUser });
  });

  it("Adds user in userJoined to list of users", () => {
    const joinedUser = { id: 0, name: "test" };
    const newState = rootReducer(
      { users: [] },
      { type: userJoined, payload: joinedUser },
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ users: [joinedUser] });
  });

  it("handles typingStarted action", () => {
    const newState = rootReducer({}, { type: typingStarted });

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ currentUserIsTyping: true });
  });

  it("handles typingStopped action", () => {
    const newState = rootReducer({}, { type: typingStopped });

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ currentUserIsTyping: false });
  });

  it("handles messageAdded action, adding message to messages array", () => {
    const newState = rootReducer(
      { messages: [] },
      {
        type: messageAdded,
        payload: { message: "test" },
        metadata: { createdAt: 0 },
      },
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual({
      messages: [
        {
          message: "test",
          createdAt: 0,
        },
      ],
    });
  });

  it("handles usersRequested action, replacing users in state with array in payload", () => {
    const newState = rootReducer(
      { users: [] },
      {
        type: usersRequested,
        payload: [{ id: 0, name: "test" }],
      },
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ users: [{ id: 0, name: "test" }] });
  });

  it("handles userLeft action, removing user from users array", () => {
    const newState = rootReducer(
      { users: [{ id: 0, name: "test" }] },
      {
        type: userLeft,
        payload: { userId: 0 },
      },
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ users: [] });
  });

  it("handles userStartedTyping action, adding typing userId to userIdsTyping", () => {
    const newState = rootReducer(
      { userIdsTyping: {} },
      {
        type: userStartedTyping,
        payload: { userId: 0 },
      },
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ userIdsTyping: { "0": true } });
  });

  it("handles userStoppedTyping action - removing typing user from userIdsTyping", () => {
    const newState = rootReducer(
      { userIdsTyping: { 0: true } },
      {
        type: userStoppedTyping,
        payload: { userId: 0 },
      },
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual({ userIdsTyping: {} });
  });
});
