import { compose, applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";

import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_ORDERS,
  FEED_SEND_ORDERS,
} from "./actions/feed";

import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_INIT,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_ORDERS,
  ORDERS_SEND_ORDERS,
} from "./actions/orders";

const WsUrl = "wss://norma.nomoreparties.space/orders/all";

const feedWsActions = {
  wsInit: FEED_CONNECTION_INIT,
  onOpen: FEED_CONNECTION_SUCCESS,
  onError: FEED_CONNECTION_ERROR,
  onClose: FEED_CONNECTION_CLOSED,
  onMessage: FEED_GET_ORDERS,
  sendMessage: FEED_SEND_ORDERS,
};

const ordersWsActions = {
  wsInit: ORDERS_CONNECTION_INIT,
  onOpen: ORDERS_CONNECTION_SUCCESS,
  onClose: ORDERS_CONNECTION_CLOSED,
  onError: ORDERS_CONNECTION_ERROR,
  onMessage: ORDERS_GET_ORDERS,
  sendMessage: ORDERS_SEND_ORDERS,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WsUrl, feedWsActions),
    socketMiddleware(WsUrl, ordersWsActions)
  )
);

const store = createStore(rootReducer, enhancer);

export default store;
