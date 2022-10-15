import {
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_ORDERS,
  FEED_SEND_ORDERS,
} from "../action-types/feed-types";
import { TFeedResponce } from "../types/data";

const onlyOneTypeActionCreator = (type: string) => {
  return {
    type: type,
  };
};

const payloadActionCreator = (type: string, payload: string) => {
  return {
    type: type,
    payload: payload,
  };
};

interface IFeedConnectionStart {
  readonly type: typeof FEED_CONNECTION_INIT;
}
interface IFeedConnectionSuccess {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
}
interface IFeedConnectionError {
  readonly type: typeof FEED_CONNECTION_ERROR;
}
interface IFeedConnectionClosed {
  readonly type: typeof FEED_CONNECTION_CLOSED;
}
interface IFeedGetOrders {
  readonly type: typeof FEED_GET_ORDERS;
  payload: TFeedResponce;
}
interface IFeedSendOrders {
  readonly type: typeof FEED_SEND_ORDERS;
  payload: TFeedResponce;
}

export const feedConnectionInit = (payload: string) => {
  return payloadActionCreator(FEED_CONNECTION_INIT, payload);
};

export const feedConnectionClosed = () => {
  return onlyOneTypeActionCreator(FEED_CONNECTION_CLOSED);
};

export const ordersGetMessage = (order: string) => {
  return payloadActionCreator(FEED_GET_ORDERS, order);
};

export const ordersSendMessage = (order: string) => {
  return payloadActionCreator(FEED_SEND_ORDERS, order);
};

export type TFeedActions =
  | IFeedConnectionStart
  | IFeedConnectionSuccess
  | IFeedConnectionError
  | IFeedConnectionClosed
  | IFeedGetOrders
  | IFeedSendOrders;
