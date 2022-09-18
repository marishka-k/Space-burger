import {
  CLOSE_INGREDIENT_DETAILS_MODAL,
  CLOSE_ORDER_INFO_MODAL,
} from "../actions/colse-modal";

const modal = {
  openModalIngredient: null,
  openModalOrder: null,
};

export const closeModalReducer = (state = modal, action) => {
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
