import { orderDetailsRequest } from "../../components/api/api";
import {
  ORDER_DETAILS_CLOSE_MODAL,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../action-types/order-details-types";
import { AppDispatch, AppThunk } from "../types";

export interface IOrderDetailsFailed {
  readonly type: typeof ORDER_DETAILS_FAILED;
}

export interface IOrderDetailsRequest {
  readonly type: typeof ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccess {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  readonly number: number;
}

export const getOrderDetails: AppThunk = (order: Array<string>) => {
  return function (dispatch: AppDispatch) {
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
};

export interface IOrderDetailsCloseModal {
  readonly type: typeof ORDER_DETAILS_CLOSE_MODAL;
}

export function closeOrderDetailsModal() {
  return {
    type: ORDER_DETAILS_CLOSE_MODAL,
  };
}

export type TOrderDetailsActions =
  | IOrderDetailsFailed
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsCloseModal;
