import {
  ORDERS_CONNECTION_INIT,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_ORDERS,
  ORDERS_SEND_ORDERS,
 
} from "../action-types/orders-types";
import { TFeedResponse } from "../types/data";

interface IOrdersConnectionInit {
  readonly type: typeof ORDERS_CONNECTION_INIT;
  payload: TFeedResponse;
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
  payload: TFeedResponse;
}

interface IOrdersSendMessage {
  readonly type: typeof ORDERS_SEND_ORDERS;
  payload: TFeedResponse;
}

const onlyOneTypeActionCreator = (type: string) => {
  return {
    type: type,
  };
};

const payloadActionCreator = (type: string, payload: TFeedResponse) => {
  return {
    type: type,
    payload: payload,
  };
};

export const ordersConnectionInit = (payload: TFeedResponse) => {
  return payloadActionCreator(ORDERS_CONNECTION_INIT, payload);
};

export const ordersConnectionClosed = () => {
  return onlyOneTypeActionCreator(ORDERS_CONNECTION_CLOSED);
};

export const ordersGetMessage = (order: TFeedResponse) => {
  return payloadActionCreator(ORDERS_GET_ORDERS, order);
};

export const ordersSendMessage = (order: TFeedResponse) => {
  return payloadActionCreator(ORDERS_SEND_ORDERS, order);
};

export type TOrdersActions =
	| IOrdersConnectionInit
	| IOrdersConnectionSuccess
	| IOrdersConnectionError
	| IOrdersConnectionClosed
	| IOrdersGetMessage
	| IOrdersSendMessage;