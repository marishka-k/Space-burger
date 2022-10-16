import { getIngredientsData } from "../../components/api/api";
import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
} from "../action-types/ingredients-types";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient } from "../types/data";

export interface IIngredientsFailed {
	readonly type: typeof INGREDIENTS_FAILED;
}

export interface IIngredientsRequest {
	readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccess {
	readonly type: typeof INGREDIENTS_SUCCESS;
	ingredients: Array<TIngredient>;
}


export const getBurgerIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    });
    getIngredientsData()
      .then((res) => {
        dispatch({
          type: INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: INGREDIENTS_FAILED,
        });
      });
  };
} 

export type TIngredientsActions =
	| IIngredientsFailed
	| IIngredientsRequest
	| IIngredientsSuccess;


