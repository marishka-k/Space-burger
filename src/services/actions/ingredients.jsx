import { getIngredientsData } from "../../components/api/api";
import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
} from "../action-types/ingredients-types";

export function getBurgerIngredients() {
  return function (dispatch) {
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
