import { orderDetailsRequest } from "../../components/api/api";
import {
  ORDER_DETAILS_CLOSE_MODAL,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../action-types/order-details-types";

export function getOrderDetails(order) {
  return function (dispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    orderDetailsRequest(order)
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          number: res.order.number,
        });
      })
      .catch(() => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
}

export function closeOrderDetailsModal() {
  return {
    type: ORDER_DETAILS_CLOSE_MODAL,
  };
}
