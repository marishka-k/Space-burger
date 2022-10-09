import {
  CLOSE_INGREDIENT_DETAILS_MODAL,
  CLOSE_ORDER_INFO_MODAL,
} from "../action-types/colse-modal-types";

export const closeOrderInfoModal = () => {
  return {
    type: CLOSE_ORDER_INFO_MODAL,
  };
};

export const closeIngredientModal = () => {
  return {
    type: CLOSE_INGREDIENT_DETAILS_MODAL,
  };
};
