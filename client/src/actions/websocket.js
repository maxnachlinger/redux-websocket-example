export const setupWebsocket = ({ host, port }) =>
  new Promise((resolve) => {
    const webSocket = new WebSocket(`ws://${host}:${port}`);

    const receive = (onMessageCb) => {
      webSocket.onmessage = (event) => onMessageCb(JSON.parse(event.data));
    };

    const send = (type, payload) =>
      webSocket.send(JSON.stringify({ type, payload }));

    webSocket.onopen = () => resolve({ send, receive });
  });
