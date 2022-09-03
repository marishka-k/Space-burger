import {
  LOGIN_FORM_REQUEST,
  LOGIN_FORM_SUCCESS,
  LOGIN_FORM_FAILED,
  LOGIN_FORM_SET_VALUE,
  LOGOUT_FORM_REQUEST,
  LOGOUT_FORM_SUCCESS,
  LOGOUT_FORM_FAILED,
  REGISTER_FORM_REQUEST,
  REGISTER_FORM_SUCCESS,
  REGISTER_FORM_FAILED,
  REGISTER_FORM_SET_VALUE,
  CHANGE_USER_REQUEST,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from "../actions/auth";

const initialState = {
  message: "",

  user: {
    name: "",
    email: "",
  },

  data: {
    name: "",
    email: "",
    password: "",
    code: "",
  },

  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  logoutRequest: false,
  logoutFailed: false,

  chgangeUserRequest: false,
  chgangeUserFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_REQUEST: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: true,
      };
    }

    case LOGIN_FORM_SUCCESS: {
      return {
        ...state,
        user: action.user,
        data: {
          ...state.data,
          email: "",
          password: "",
        },
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
      };
    }

    case LOGIN_FORM_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }

    case LOGIN_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      };
    }

    case LOGOUT_FORM_REQUEST: {
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: true,
      };
    }

    case LOGOUT_FORM_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          email: "",
          name: "",
        },
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    case LOGOUT_FORM_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    case REGISTER_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      };
    }
    case REGISTER_FORM_REQUEST: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: true,
      };
    }
    case REGISTER_FORM_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }
    case REGISTER_FORM_SUCCESS: {
      return {
        ...state,
        user: action.playload,
        data: {
          ...state.data,
          email: "",
          password: "",
          name: "",
        },
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
      };
    }

    case CHANGE_USER_REQUEST: {
      return {
        ...state,
        chgangeUserFailed: false,
        chgangeUserRequest: true,
      };
    }

    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        user: action.playload,
        data: {
          ...state.data,
          email: "",
          password: "",
          name: "",
        },
        chgangeUserRequest: false,
        chgangeUserFailed: false,
      };
    }

    case CHANGE_USER_FAILED: {
      return {
        ...state,
        chgangeUserFailed: true,
        chgangeUserRequest: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: true,
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.data,
          email: "",
        },
        message: action.message,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        forgotPasswordSuccess: true,
      };
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
