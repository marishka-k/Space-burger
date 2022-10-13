import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_ORDERS,
} from "../action-types/feed-types";

const initialState = {
  wsConnected: false,
  error: undefined,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };

    case FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };

    case FEED_GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined,
      };

    default:
      return state;
  }
};
