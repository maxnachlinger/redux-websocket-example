import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "preact-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { setupWebsocket } from "./actions/websocket";
import rootReducer from "./reducers";
import App from "./App";
import "./style.css";
import { requestUsers } from "./actions";
import { host, port } from "../../common/config";

const setupStore = () => {
  const initialState = {
    messages: [],
    users: [],
    userIdsTyping: {},
    currentUser: null,
    currentUserIsTyping: false,
  };

  const middleware = [];

  if (process.env.NODE_ENV === "development") {
    const { createLogger } = require("redux-logger");
    middleware.push(createLogger());
  }

  return setupWebsocket({ host, port }).then(({ send, receive }) => {
    middleware.push(thunkMiddleware.withExtraArgument({ send }));

    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(...middleware),
    );

    receive(store.dispatch);
    requestUsers(send);
    return store;
  });
};

setupStore().then((store) =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body,
  ),
);
