import {
  ORDERS_CONNECTION_INIT,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_ORDERS,
  ORDERS_SEND_ORDERS,
 
} from "../action-types/orders-types";
import { TFeedResponce } from "../types/data";

interface IOrdersConnectionInit {
  readonly type: typeof ORDERS_CONNECTION_INIT;
  payload: TFeedResponce;
}

interface IOrdersConnectionSuccess {
  readonly type: typeof ORDERS_CONNECTION_SUCCESS;
}

interface IOrdersConnectionError {
  readonly type: typeof ORDERS_CONNECTION_ERROR;
}

interface IOrdersConnectionClosed {
  readonly type: typeof ORDERS_CONNECTION_CLOSED;
}

interface IOrdersGetMessage {
  readonly type: typeof ORDERS_GET_ORDERS;
  payload: TFeedResponce;
}

interface IOrdersSendMessage {
  readonly type: typeof ORDERS_SEND_ORDERS;
  payload: TFeedResponce;
}

const onlyOneTypeActionCreator = (type: string) => {
  return {
    type: type,
  };
};

const payloadActionCreator = (type: string, payload: TFeedResponce) => {
  return {
    type: type,
    payload: payload,
  };
};

export const ordersConnectionInit = (payload: TFeedResponce) => {
  return payloadActionCreator(ORDERS_CONNECTION_INIT, payload);
};

export const ordersConnectionClosed = () => {
  return onlyOneTypeActionCreator(ORDERS_CONNECTION_CLOSED);
};

export const ordersGetMessage = (order: TFeedResponce) => {
  return payloadActionCreator(ORDERS_GET_ORDERS, order);
};

export const ordersSendMessage = (order: TFeedResponce) => {
  return payloadActionCreator(ORDERS_SEND_ORDERS, order);
};

export type TOrdersActions =
	| IOrdersConnectionInit
	| IOrdersConnectionSuccess
	| IOrdersConnectionError
	| IOrdersConnectionClosed
	| IOrdersGetMessage
	| IOrdersSendMessage;