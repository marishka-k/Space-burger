import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_ORDERS,
} from "../actions/orders";

const initialState = {
  wsConnected: false,
  error: undefined,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };

    case ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };

    case ORDERS_GET_ORDERS:
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
