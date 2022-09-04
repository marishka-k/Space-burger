import { deleteCookie, setCookie } from "../../utils/cookie";
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

export const LOGIN_FORM_REQUEST = "LOGIN_FORM_REQUEST";
export const LOGIN_FORM_SUCCESS = "LOGIN_FORM_SUCCESS";
export const LOGIN_FORM_FAILED = "LOGIN_FORM_FAILED";
export const LOGIN_FORM_SET_VALUE = "LOGIN_FORM_SET_VALUE";

export const LOGOUT_FORM_REQUEST = "LOGOUT_FORM_REQUEST";
export const LOGOUT_FORM_SUCCESS = "LOGOUT_FORM_SUCCESS";
export const LOGOUT_FORM_FAILED = "LOGOUT_FORM_FAILED";

export const REGISTER_FORM_REQUEST = "REGISTER_FORM_REQUEST";
export const REGISTER_FORM_SUCCESS = "REGISTER_FORM_SUCCESS";
export const REGISTER_FORM_FAILED = "REGISTER_FORM_FAILED";
export const REGISTER_FORM_SET_VALUE = "REGISTER_FORM_SET_VALUE";

export const CHANGE_USER_REQUEST = "CHANGE_USER_REQUEST";
export const CHANGE_USER_SUCCESS = "CHANGE_USER_SUCCESS";
export const CHANGE_USER_FAILED = "CHANGE_USER_FAILED";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_FORM_SET_VALUE = "RESET_FORM_SET_VALUE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const setLoginFormValue = (field, value) => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value,
});

export function singIn(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_FORM_REQUEST,
    });
    loginRequest(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_FORM_SUCCESS,
            user: res.user,
          });
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          return res;
        } else {
          dispatch({
            type: LOGIN_FORM_FAILED,
          });
          return res;
        }
      })

      .catch(() => {
        dispatch({
          type: LOGIN_FORM_FAILED,
        });
      });
  };
}

export function updateToken() {
  return function (dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
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
      .catch(() => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
}

export function singOut() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_FORM_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        const refreshToken = res.refreshToken;
        deleteCookie("token");
        localStorage.removeItem("refreshToken", refreshToken);
        if (res && res.success) {
          dispatch({
            type: LOGOUT_FORM_SUCCESS,
          });
        } else {
          dispatch({ type: LOGOUT_FORM_FAILED });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FORM_FAILED,
        });
      });
  };
}

export const setRegisterFormValue = (field, value) => ({
  type: REGISTER_FORM_SET_VALUE,
  field,
  value,
});

export function registerUser(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_FORM_REQUEST,
    });
    resgisterUserRequest(email, password, name)
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
          user: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FORM_FAILED,
        });
      });
  };
}

export function changeUser(email, name, password) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_USER_REQUEST,
    });
    changeUserInfoRequest(email, name, password)
      .then((res) => {
        dispatch({
          type: CHANGE_USER_SUCCESS,
          user: res,
        });
      })
      .catch(() => {
        dispatch({
          type: CHANGE_USER_FAILED,
        });
      });
  };
}

export function forgotPassword(email) {
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
}

export const setResetFormValue = (field, value) => ({
  type: RESET_FORM_SET_VALUE,
  field,
  value,
});

export function resetPassword(password, token) {
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
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          });
          return res
        }
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}
