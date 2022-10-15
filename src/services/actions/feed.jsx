export const FEED_CONNECTION_INIT = "FEED_CONNECTION_INIT";
export const FEED_CONNECTION_SUCCESS = "FEED_CONNECTION_SUCCESS";
export const FEED_CONNECTION_ERROR = "FEED_CONNECTION_ERROR";
export const FEED_CONNECTION_CLOSED = "FEED_CONNECTION_CLOSED";
export const FEED_GET_ORDERS = "FEED_GET_ORDERS";
export const FEED_SEND_ORDERS = "FEED_SEND_ORDERS";

const onlyOneTypeActionCreator = (type) => {
  return {
    type: type,
  };
};

const payloadActionCreator = (type, payload) => {
  return {
    type: type,
    payload: payload,
  };
};

export const feedConnectionInit = (payload) => {
  return payloadActionCreator(FEED_CONNECTION_INIT, payload);
};

export const feedConnectionClosed = () => {
  return onlyOneTypeActionCreator(FEED_CONNECTION_CLOSED);
};

export const ordersGetMessage = (order) => {
  return payloadActionCreator(FEED_GET_ORDERS, order);
};

export const ordersSendMessage = (order) => {
  return payloadActionCreator(FEED_SEND_ORDERS, order);
};
