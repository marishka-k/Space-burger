/* import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "../reducers";

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type AppThunk<ReturnType = void> = ThunkAction<
  unknown,
  ReturnType,
  RootState,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>(); */

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import store from "../store";
import { rootReducer } from "../reducers";

import { TAuthActions } from "../actions/auth";
import { TConstructorActions } from "../actions/constructor";
import { TFeedActions } from "../actions/feed";
import { TIngredientsActions } from "../actions/ingredients";
import { TCloseModal } from "../actions/colse-modal";
import { TOrderDetailsActions } from "../actions/order-details";
import { TOrdersActions } from "../actions/orders";

type TApplicationActions =
  | TAuthActions
  | TConstructorActions
  | TFeedActions
  | TIngredientsActions
  | TCloseModal
  | TOrderDetailsActions
  | TOrdersActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
