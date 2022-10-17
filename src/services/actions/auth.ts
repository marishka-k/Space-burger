import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  changeUserInfoRequest,
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  resgisterUserRequest,
  updateTokenRequest,
  resetPasswordRequest,
  getUserRequest,
} from "../../components/api/api";
import {
  AUTH_CHECKED,
  CHANGE_USER_FAILED,
  CHANGE_USER_REQUEST,
  CHANGE_USER_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FORM_FAILED,
  LOGIN_FORM_REQUEST,
  LOGIN_FORM_SUCCESS,
  LOGOUT_FORM_FAILED,
  LOGOUT_FORM_REQUEST,
  LOGOUT_FORM_SUCCESS,
  REGISTER_FORM_FAILED,
  REGISTER_FORM_REQUEST,
  REGISTER_FORM_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
} from "../action-types/auth-types";

import { TUser } from "../types/data";
import { AppThunk } from "../types";

interface ISingInFailed {
  readonly type: typeof LOGIN_FORM_FAILED;
}

interface ISingInRequest {
  readonly type: typeof LOGIN_FORM_REQUEST;
}

interface ISingInSuccess {
  readonly type: typeof LOGIN_FORM_SUCCESS;
  readonly user: TUser;
}

export const singIn: AppThunk = (email: string, password: string) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_FORM_REQUEST,
    });
    loginRequest(email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: LOGIN_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: LOGIN_FORM_FAILED,
        });
        return err;
      });
  };
};

interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export const updateToken: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    updateTokenRequest()
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", authToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
        return err;
      });
  };
};

interface ISingOutRequest {
  readonly type: typeof LOGOUT_FORM_REQUEST;
}

interface ISingOutSuccess {
  readonly type: typeof LOGOUT_FORM_SUCCESS;
}

interface ISingOutFailed {
  readonly type: typeof LOGOUT_FORM_FAILED;
}

export const singOut: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_FORM_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        const refreshToken = res.refreshToken;
        deleteCookie("token");
        localStorage.removeItem(refreshToken);
        if (res && res.success) {
          dispatch({
            type: LOGOUT_FORM_SUCCESS,
          });
        } else {
          dispatch({
            type: LOGOUT_FORM_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: LOGOUT_FORM_FAILED,
        });
        return err;
      });
  };
};

interface IRegisterUserRequest {
  readonly type: typeof REGISTER_FORM_REQUEST;
}

interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_FORM_SUCCESS;
  readonly user: TUser;
}

interface IRegisterUserFailed {
  readonly type: typeof REGISTER_FORM_FAILED;
}

export const registerUser: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_FORM_REQUEST,
    });
    resgisterUserRequest(name, email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: REGISTER_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FORM_FAILED,
        });
      });
  };
};

interface IChangeUserRequest {
  readonly type: typeof CHANGE_USER_REQUEST;
}

interface IChangeUserSuccess {
  readonly type: typeof CHANGE_USER_SUCCESS;
  readonly user: TUser;
}

interface IChangeUserFailed {
  readonly type: typeof CHANGE_USER_FAILED;
}

export const changeUser: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch) {
    dispatch({
      type: CHANGE_USER_REQUEST,
    });
    changeUserInfoRequest(name, email, password)
      .then((res) => {
        dispatch({
          type: CHANGE_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: CHANGE_USER_FAILED,
        });
        return err;
      });
  };
};

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  message: string;
}

interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export const forgotPassword: AppThunk = (email: string) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPasswordRequest(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: res.message,
        });
      })
      .catch(() => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
};

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export const resetPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordRequest(password, token)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
};

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export const getUser: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: GET_USER_FAILED,
        });
        return err;
      });
  };
};

interface IAuthChacked {
  readonly type: typeof AUTH_CHECKED;
}

export const checkUzerAuth: AppThunk = () => {
  return function (dispatch) {
    if (getCookie("token")) {
      dispatch(getUser());
      dispatch({
        type: AUTH_CHECKED,
      });
    } else {
      dispatch({
        type: AUTH_CHECKED,
      });
    }
  };
};


export type TAuthActions =
  | ISingInFailed
  | ISingInRequest
  | ISingInSuccess
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateTokenFailed
  | ISingOutRequest
  | ISingOutSuccess
  | ISingOutFailed
  | IRegisterUserRequest
  | IRegisterUserSuccess
  | IRegisterUserFailed
  | IChangeUserRequest
  | IChangeUserSuccess
  | IChangeUserFailed
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IAuthChacked;
