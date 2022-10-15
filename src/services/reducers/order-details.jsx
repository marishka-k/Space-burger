import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_CLOSE_MODAL,
} from "../actions/order-details";

const orderInitialState = {
  request: false,
  number: null,
  error: false,
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        error: false,
        request: true,
      };
    }

    case ORDER_DETAILS_SUCCESS: {
        return {
          ...state,
          number: action.number,
          request: false,
          error: false,
        };
      }

    case ORDER_DETAILS_FAILED: {
      return {
        ...state,
        error: true,
        request: false,
      };
    } 

    case ORDER_DETAILS_CLOSE_MODAL: {
      return {
        ...state,
        number: null,
      };
    }
    default: {
      return state;
    }
  }
};
