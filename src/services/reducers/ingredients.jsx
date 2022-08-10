import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
} from "../actions/ingredients";

const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {

    case INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }

    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }

    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };

    }

    default: {
      return state;
      
    }
  }
};
