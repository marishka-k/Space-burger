import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_ORDERS,
} from "../action-types/feed-types";
import { TFeedActions } from "../actions/feed";
import { TFeed } from "../types/data";

type TInitialState = {
	wsConnected: boolean;
  orders: TFeed[],
	total: number;
	totalToday: number;
}


const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const feedReducer = (state = initialState, action: TFeedActions): TInitialState => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case FEED_GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
