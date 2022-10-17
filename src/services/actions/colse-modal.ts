import {
  CLOSE_INGREDIENT_DETAILS_MODAL,
  CLOSE_ORDER_INFO_MODAL,
} from "../action-types/colse-modal-types";

export interface ICloseOrderInfoModal {
  readonly type: typeof CLOSE_ORDER_INFO_MODAL;
}

export const closeOrderInfoModal = (): ICloseOrderInfoModal => {
  return {
    type: CLOSE_ORDER_INFO_MODAL,
  };
};

export interface ICloseIngredientDetailsModal {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS_MODAL;
}

export const closeIngredientModal = (): ICloseIngredientDetailsModal => {
  return {
    type: CLOSE_INGREDIENT_DETAILS_MODAL,
  };
};

export type TCloseModal = ICloseOrderInfoModal | ICloseIngredientDetailsModal;
