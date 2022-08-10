import { INGREDIENT_DETAILS_CLOSE, INGREDIENT_DETAILS_OPEN } from "../actions/ingredient-details";

const ingredientModal = {
  openModal: null,
};

export const ingredientReducer = (state = ingredientModal, action) => {
  switch (action.type) {
    case INGREDIENT_DETAILS_OPEN: {
      return {
        ...state,
        openModal: action.ingredient,
      };
    }
    case INGREDIENT_DETAILS_CLOSE: {
      return {
        ...state,
        openModal: null,
      };
    }
    default: {
      return state;
    }
  }
};
