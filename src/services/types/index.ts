import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TAuthActions } from "../actions/auth";
import { rootReducer } from "../reducers";
import store from "../store";

type TApplicationActions = TAuthActions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
