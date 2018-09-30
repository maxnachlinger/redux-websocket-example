const _ = require("lodash");
const { v4: uuid } = require("uuid");
const WebSocket = require("ws");

const {
  joinRequested,
  messageAdded,
  userJoined,
  userLeft,
  usersRequested,
  userStartedTyping,
  userStoppedTyping,
} = require("../common/message-types");

const parseMessage = (json) => {
  try {
    return JSON.parse(json);
  } catch (err) {
    return {};
  }
};

const addMetadata = ({ type, payload }) => ({
  type,
  payload,
  metadata: {
    createdAt: Date.now(),
  },
});

const broadcast = ({ wss, message }) => {
  return wss.clients.forEach(
    (ws) =>
      ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify(message)),
  );
};

const sendSystemMessage = ({ wss, message }) =>
  broadcast({
    wss,
    message: addMetadata({
      type: messageAdded,
      payload: { message },
    }),
  });

// user.id -> timerId, for clearing pending userLeft messages on refresh (which
// is a quick disconnect / reconnect)
const disconnectedUsers = {};

const onDisconnect = ({ wss, ws }) => {
  const user = _.get(ws, "req.session.user");
  if (!user) {
    return;
  }

  // this disconnect might be a refresh, give it a moment to make sure the user
  // isn't coming back
  disconnectedUsers[user.id] = setTimeout(() => {
    delete disconnectedUsers[user.id];
    broadcast({
      wss,
      message: addMetadata({
        type: userLeft,
        payload: {
          userId: user.id,
        },
      }),
    });
    return sendSystemMessage({ wss, message: `${user.name} left` });
  }, 2000);
};

const onUsersRequested = ({ wss, ws }) => {
  const payload =
    [...wss.clients]
      .filter(
        (wsClient) =>
          ws.readyState === WebSocket.OPEN &&
          _.get(wsClient, "req.session.user"),
      )
      .map((wsClient) => wsClient.req.session.user) || [];

  return ws.send(
    JSON.stringify(
      addMetadata({
        type: usersRequested,
        payload,
      }),
    ),
  );
};

const handleReconnect = ({ wss, ws, user }) => {
  const timeoutId = disconnectedUsers[user.id];

  if (timeoutId) {
    clearTimeout(timeoutId);
    return;
  }

  ws.send(
    JSON.stringify(
      addMetadata({
        type: joinRequested,
        payload: user,
      }),
    ),
  );
  broadcast({
    wss,
    message: addMetadata({
      type: userJoined,
      payload: user,
    }),
  });
};

const onJoinRequested = ({ wss, ws, payload: { id = uuid(), name } = {} }) => {
  const user = { id, name };
  ws.req.session.user = user;
  ws.req.session.save((err) => {
    if (err) {
      return;
    }

    ws.send(
      JSON.stringify(
        addMetadata({
          type: joinRequested,
          payload: user,
        }),
      ),
    );
    broadcast({
      wss,
      message: addMetadata({
        type: userJoined,
        payload: user,
      }),
    });
    return sendSystemMessage({ wss, message: `${user.name} joined` });
  });
};

const onMessageAdded = ({ wss, ws, payload: { message } }) => {
  const user = _.get(ws, "req.session.user");

  return broadcast({
    wss,
    message: addMetadata({
      type: messageAdded,
      payload: {
        id: uuid.v4(),
        message,
        user,
      },
    }),
  });
};

const onUserStartedTyping = ({ wss, ws }) => {
  const user = _.get(ws, "req.session.user");

  return broadcast({
    wss,
    message: addMetadata({
      type: userStartedTyping,
      payload: {
        userId: user.id,
      },
    }),
  });
};

const onUserStoppedTyping = ({ wss, ws }) => {
  const user = _.get(ws, "req.session.user");

  return broadcast({
    wss,
    message: addMetadata({
      type: userStoppedTyping,
      payload: {
        userId: user.id,
      },
    }),
  });
};

const messageHandlerMap = {
  [usersRequested]: onUsersRequested,
  [joinRequested]: onJoinRequested,
  [messageAdded]: onMessageAdded,
  [userStartedTyping]: onUserStartedTyping,
  [userStoppedTyping]: onUserStoppedTyping,
};

const wsMessageHandler = ({ wss, ws }) => {
  ws.on("close", () => onDisconnect({ wss, ws }));

  return (message) => {
    const { type, payload } = parseMessage(message);
    const handler = messageHandlerMap[type];

    if (handler) {
      handler({ wss, ws, payload });
    }
  };
};

const checkHandleReconnect = ({ wss, ws }) => {
  const user = _.get(ws, "req.session.user");

  if (user) {
    handleReconnect({ wss, ws, user });
  }
};

module.exports = { wsMessageHandler, checkHandleReconnect };
