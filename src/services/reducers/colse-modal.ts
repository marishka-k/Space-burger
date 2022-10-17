import {
  CLOSE_INGREDIENT_DETAILS_MODAL,
  CLOSE_ORDER_INFO_MODAL,
} from "../action-types/colse-modal-types"
import { TCloseModal } from "../actions/colse-modal";

export type TModal = {
	openModalIngredient: string | null;
	openModalOrder: string | null;
}

const modal = {
  openModalIngredient: null,
  openModalOrder: null,
};

export const closeModalReducer = (state = modal, action: TCloseModal): TModal => {
  switch (action.type) {
    case CLOSE_ORDER_INFO_MODAL: {
      return {
        ...state,
        openModalOrder  : null,
      };
    }

    case CLOSE_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        openModalIngredient: null,
      };
    }

    default: {
      return state;
    }
  }
};
