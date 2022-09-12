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

export const AUTH_CHECKED = "AUTH_CHECKED";

const onlyOneTypeActionCreator = (type) => {
  return {
    type: type,
  };
};

const userActionsActionCreator = (type, user) => {
  return {
    type: type,
    user: user,
  };
};

export const setLoginFormValue = (field, value) => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value,
});

export function singIn(email, password) {
  return function (dispatch) {
    dispatch(onlyOneTypeActionCreator(LOGIN_FORM_REQUEST));
    loginRequest(email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch(userActionsActionCreator(LOGIN_FORM_SUCCESS, res.user));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(onlyOneTypeActionCreator(LOGIN_FORM_FAILED));
        return err;
      });
  };
}

export function updateToken() {
  return function (dispatch) {
    dispatch(onlyOneTypeActionCreator(UPDATE_TOKEN_REQUEST));
    updateTokenRequest()
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", authToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(onlyOneTypeActionCreator(UPDATE_TOKEN_SUCCESS));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(onlyOneTypeActionCreator(UPDATE_TOKEN_FAILED));
        return err;
      });
  };
}

export function singOut() {
  return function (dispatch) {
    dispatch(onlyOneTypeActionCreator(LOGOUT_FORM_REQUEST));
    logoutRequest()
      .then((res) => {
        const refreshToken = res.refreshToken;
        deleteCookie("token");
        localStorage.removeItem("refreshToken", refreshToken);
        if (res && res.success) {
          dispatch(onlyOneTypeActionCreator(LOGOUT_FORM_SUCCESS));
        } else {
          dispatch(onlyOneTypeActionCreator(LOGOUT_FORM_FAILED));
        }
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(onlyOneTypeActionCreator(LOGOUT_FORM_FAILED));
        return err;
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
    dispatch(onlyOneTypeActionCreator(REGISTER_FORM_REQUEST));
    resgisterUserRequest(email, password, name)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch(userActionsActionCreator(REGISTER_FORM_SUCCESS, res.user));
      })
      .catch(() => {
        dispatch(onlyOneTypeActionCreator(REGISTER_FORM_FAILED));
      });
  };
}

export function changeUser(name, email, password) {
  return function (dispatch) {
    dispatch(onlyOneTypeActionCreator(CHANGE_USER_REQUEST));
    changeUserInfoRequest(email, name, password)
      .then((res) => {
        dispatch(userActionsActionCreator(CHANGE_USER_SUCCESS, res.user));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(onlyOneTypeActionCreator(CHANGE_USER_FAILED));
        return err;
      });
  };
}

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch(onlyOneTypeActionCreator(FORGOT_PASSWORD_REQUEST));
    forgotPasswordRequest(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: res.message,
        });
      })
      .catch(() => {
        dispatch(onlyOneTypeActionCreator(FORGOT_PASSWORD_FAILED));
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
    dispatch(onlyOneTypeActionCreator(RESET_PASSWORD_REQUEST));
    resetPasswordRequest(password, token)
      .then(() => {
        dispatch(onlyOneTypeActionCreator(RESET_PASSWORD_SUCCESS));
      })
      .catch(() => {
        dispatch(onlyOneTypeActionCreator(RESET_PASSWORD_FAILED));
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch(onlyOneTypeActionCreator(GET_USER_REQUEST));
    getUserRequest()
      .then((res) => {
        dispatch(userActionsActionCreator(GET_USER_SUCCESS, res.user));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(onlyOneTypeActionCreator(GET_USER_FAILED));
        return err;
      });
  };
}

export const checkUzerAuth = () => {
  return function (dispatch) {
    if (getCookie("token")) {
      dispatch(getUser());
      dispatch(onlyOneTypeActionCreator(AUTH_CHECKED));
    } else {
      dispatch(onlyOneTypeActionCreator(AUTH_CHECKED));
    }
  };
};
