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
}

const ingredientsInitialState: TIngredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,   
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsInitialState => {
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
