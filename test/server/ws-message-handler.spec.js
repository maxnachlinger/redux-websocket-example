const EventEmitter = require("events");
const WebSocket = require("ws");
const {
  userStoppedTyping,
  userStartedTyping,
  usersRequested,
  userLeft,
  userJoined,
  messageAdded,
  joinRequested,
} = require("../../common/message-types");
const {
  wsMessageHandler,
  checkHandleReconnect,
} = require("../../server/ws-message-handler");

const getTestWebsockets = ({ wsUser, anotherWsUser } = {}) => {
  const ws = {
    readyState: WebSocket.OPEN,
    req: {
      session: {
        save: jest.fn((cb) => cb()),
        user: wsUser,
      },
    },
    send: jest.fn(),
  };

  const anotherWs = {
    readyState: WebSocket.OPEN,
    req: {
      session: {
        save: jest.fn((cb) => cb()),
        user: anotherWsUser,
      },
    },
    send: jest.fn(),
  };

  const wss = {
    clients: [ws, anotherWs],
  };

  return { ws: Object.assign(new EventEmitter(), ws), anotherWs, wss };
};

describe("ws-message-handler", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
    Date.now = jest.fn(() => 0);
  });

  it("wsMessageHandler() handles joinRequested message", () => {
    const anotherWsUser = { id: "test-1", name: "test-1" };
    const { wss, ws, anotherWs } = getTestWebsockets({ anotherWsUser });

    const handler = wsMessageHandler({ wss, ws });
    const input = {
      type: joinRequested,
      payload: { id: "test-0", name: "test-0" },
    };

    handler(JSON.stringify(input));

    expect(ws.send).toHaveBeenNthCalledWith(
      1,
      JSON.stringify({
        type: joinRequested,
        payload: { id: "test-0", name: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(ws.send).toHaveBeenNthCalledWith(
      2,
      JSON.stringify({
        type: userJoined,
        payload: { id: "test-0", name: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(ws.send).toHaveBeenNthCalledWith(
      3,
      JSON.stringify({
        type: messageAdded,
        payload: { message: "test-0 joined" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(anotherWs.send).toHaveBeenNthCalledWith(
      1,
      JSON.stringify({
        type: userJoined,
        payload: { id: "test-0", name: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(anotherWs.send).toHaveBeenNthCalledWith(
      2,
      JSON.stringify({
        type: messageAdded,
        payload: { message: "test-0 joined" },
        metadata: { createdAt: 0 },
      }),
    );
  });

  it("wsMessageHandler() handles messageAdded message", () => {
    const wsUser = { id: "test-0", name: "test-0" };
    const anotherWsUser = { id: "test-1", name: "test-1" };
    const { wss, ws, anotherWs } = getTestWebsockets({ wsUser, anotherWsUser });

    const handler = wsMessageHandler({ wss, ws });
    const input = {
      type: messageAdded,
      payload: { message: "test-message" },
      metadata: { createdAt: 0 },
    };

    handler(JSON.stringify(input));

    const messageSentStr = anotherWs.send.mock.calls[0];
    expect(messageSentStr).toBeTruthy();

    const messageSent = JSON.parse(messageSentStr);
    expect(messageSent).toHaveProperty("type", "messageAdded");
    expect(messageSent).toHaveProperty("payload");
    expect(messageSent.payload).toHaveProperty("message", "test-message");
  });

  it("checkHandleReconnect() handles websocket with user session", () => {
    const wsUser = { id: "test-0", name: "test-0" };
    const { wss, ws, anotherWs } = getTestWebsockets({ wsUser });

    checkHandleReconnect({ wss, ws });

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: joinRequested,
        payload: { id: "test-0", name: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(anotherWs.send).toHaveBeenNthCalledWith(
      1,
      JSON.stringify({
        type: userJoined,
        payload: { id: "test-0", name: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );
  });

  it("checkHandleReconnect() ignores websocket without user session", () => {
    const { wss, ws, anotherWs } = getTestWebsockets();

    checkHandleReconnect({ wss, ws });

    expect(ws.send).not.toHaveBeenCalled();
    expect(anotherWs.send).not.toHaveBeenCalled();
  });

  it("wsMessageHandler() dispatches userLeft message on websocket close", () => {
    const wsUser = { id: "test-0", name: "test-0" };
    const anotherWsUser = { id: "test-1", name: "test-1" };
    const { wss, ws, anotherWs } = getTestWebsockets({ wsUser, anotherWsUser });

    wsMessageHandler({ wss, ws });
    ws.emit("close");
    jest.runAllTimers();

    expect(anotherWs.send).toHaveBeenNthCalledWith(
      1,
      JSON.stringify({
        type: userLeft,
        payload: { userId: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(anotherWs.send).toHaveBeenNthCalledWith(
      2,
      JSON.stringify({
        type: messageAdded,
        payload: { message: "test-0 left" },
        metadata: { createdAt: 0 },
      }),
    );
  });

  it("wsMessageHandler() handles usersRequested message", () => {
    const wsUser = { id: "test-0", name: "test-0" };
    const anotherWsUser = { id: "test-1", name: "test-1" };
    const { wss, ws } = getTestWebsockets({ wsUser, anotherWsUser });

    const handler = wsMessageHandler({ wss, ws });
    const input = {
      type: usersRequested,
    };

    handler(JSON.stringify(input));
    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: usersRequested,
        payload: [
          { id: "test-0", name: "test-0" },
          { id: "test-1", name: "test-1" },
        ],
        metadata: { createdAt: 0 },
      }),
    );
  });

  it("wsMessageHandler() handles userStartedTyping message", () => {
    const wsUser = { id: "test-0", name: "test-0" };
    const anotherWsUser = { id: "test-1", name: "test-1" };
    const { wss, ws, anotherWs } = getTestWebsockets({ wsUser, anotherWsUser });

    const handler = wsMessageHandler({ wss, ws });
    const input = {
      type: userStartedTyping,
    };

    handler(JSON.stringify(input));

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: userStartedTyping,
        payload: { userId: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(anotherWs.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: userStartedTyping,
        payload: { userId: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );
  });

  it("wsMessageHandler() handles userStoppedTyping message", () => {
    const wsUser = { id: "test-0", name: "test-0" };
    const anotherWsUser = { id: "test-1", name: "test-1" };
    const { wss, ws, anotherWs } = getTestWebsockets({ wsUser, anotherWsUser });

    const handler = wsMessageHandler({ wss, ws });
    const input = {
      type: userStoppedTyping,
    };

    handler(JSON.stringify(input));

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: userStoppedTyping,
        payload: { userId: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );

    expect(anotherWs.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: userStoppedTyping,
        payload: { userId: "test-0" },
        metadata: { createdAt: 0 },
      }),
    );
  });
});
