import { getIngredientsData } from "../../components/api/api";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_FAILED = "INGREDIENTS_FAILED";

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
