import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_ORDERS,
} from "../action-types/orders-types";
import { TOrdersActions } from "../actions/orders";
import { TFeed } from "../types/data";

export type TInitialState = {
  wsConnected: boolean;
  orders: Array<TFeed>;
  total: number;
  totalToday: number;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersReducer = (state = initialState, action: TOrdersActions): TInitialState => {
  switch (action.type) {
    
    case ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case ORDERS_GET_ORDERS:
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
