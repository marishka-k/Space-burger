import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order-details";
import { authReducer } from "./auth";
import { feedReducer } from "./feed";
import { ordersReducer } from "./orders";
import { closeModalReducer } from "./colse-modal";

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  closeModal: closeModalReducer,
  order: orderReducer,
  auth: authReducer,
  wsFeed: feedReducer,
  wsOrders: ordersReducer,
});
