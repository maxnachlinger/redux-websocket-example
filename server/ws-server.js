const WebSocket = require("ws");
const {
  wsMessageHandler,
  checkHandleReconnect,
} = require("./ws-message-handler");
const { startPing } = require("./start-ping");

const setupWss = async (serverApp, sessionMiddleware) => {
  const wss = new WebSocket.Server({
    server: serverApp.server,
    verifyClient: ({ req }, done) => {
      return sessionMiddleware(req, {}, () => done(req.session.id));
    },
  });

  wss.on("connection", (ws, req) => {
    ws.req = req;
    ws.isAlive = true;

    checkHandleReconnect({ wss, ws });

    ws.on("pong", () => (ws.isAlive = true));
    ws.on("message", wsMessageHandler({ wss, ws }));
  });

  startPing({ wss, interval: 30 * 1000 });
};

module.exports = { setupWss };
