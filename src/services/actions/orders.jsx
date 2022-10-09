import {
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_INIT,
  ORDERS_GET_ORDERS,
  ORDERS_SEND_ORDERS,
} from "../action-types/orders-types";

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

export const ordersConnectionInit = (payload) => {
  return payloadActionCreator(ORDERS_CONNECTION_INIT, payload);
};

export const ordersConnectionClosed = () => {
  return onlyOneTypeActionCreator(ORDERS_CONNECTION_CLOSED);
};

export const ordersGetMessage = (order) => {
  return payloadActionCreator(ORDERS_GET_ORDERS, order);
};

export const ordersSendMessage = (order) => {
  return payloadActionCreator(ORDERS_SEND_ORDERS, order);
};
