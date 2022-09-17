import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { ingredientReducer } from "./ingredient-details";
import { orderReducer } from "./order-details";
import { authReducer } from "./auth";
import { feedReducer } from "./feed";
import { ordersReducer } from "./orders";

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredientReducer,
  order: orderReducer,
  auth: authReducer,
  wsFeed: feedReducer,
  wsOrders: ordersReducer,
});
