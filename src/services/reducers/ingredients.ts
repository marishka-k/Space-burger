import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
} from "../action-types/ingredients-types";
import { TIngredientsActions } from "../actions/ingredients";
import { TIngredient } from "../types/data";

export type TIngredientsInitialState = {
	ingredients: Array<TIngredient>;
	ingredientsRequest: boolean;
	ingredientsFailed: boolean;
  isLoading: boolean;
}

const ingredientsInitialState: TIngredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false, 
  isLoading: true,
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsInitialState => {
  switch (action.type) {
    case INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        isLoading: false,
      };
    }

    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
        isLoading: true,
      };
    }

    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        isLoading: false,
        ingredients: action.ingredients,        
      };
    }

    default: {
      return state;
    }
  }
};
